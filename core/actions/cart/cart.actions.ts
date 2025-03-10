"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { cartItemSchema, ICartItem } from "@/core/validators";
import { cartSchema } from "@/core/validators/cart.validator";
import { convertToPlainObject, formatError, round2 } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/* TODO: controllare cart che potrebbe causare problemi soprattuto epr l'id */

// Calculate cart prices
const calcPrice = (items: ICartItem[]) => {
  const itemsPrice = items?.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10); // Free shipping over €100
  const taxPrice = round2(0.15 * itemsPrice); // 15% tax
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice); // Total price

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

// Check for cart cookie
export const getSessionCartId = async () => {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");
  return { sessionCartId };
};

export async function addItemToCart(data: ICartItem & { userId: string }) {
  try {
    console.log("📥 [addItemToCart] - Data ricevuta:", data);

    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    /* if (!sessionCartId) throw new Error("Cart session not found"); */

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart: { id: string; items: ICartItem[] } | null = await getMyCart();

    const item = cartItemSchema.parse({
      ...data,
      image: Array.isArray(data.image) ? data.image[0] : data.image,
      price: data?.price,
    });
    console.log("🔍 [addItemToCart] - Item:", item);
    /* const products =  */ await prisma.product.findMany();
    /*  console.log("🔍 [ALLPRODUCTS] - All products:", products); */

    const product = await prisma.product.findFirst({
      where: { id: item.productId }, // Usa `productId` invece di `id`
    });
    console.log("🔎 [DB] - Prodotto trovato:", product);

    if (!product) throw new Error("Product not found");

    // ✅ Se il carrello non esiste, creane uno nuovo
    if (!cart || !("items" in cart)) {
      console.log(
        "🆕 [Carrello] - Nessun carrello trovato, creazione di uno nuovo",
        { cart, item }
      );

      const {
        data: newCart,
        success,
        error,
      } = cartSchema.safeParse({
        ...(cart || {}),
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      if (success) {
        await prisma.cart.create({ data: newCart });
      } else {
        throw new Error("Failed to create new cart:" + error.format());
      }

      revalidatePath(`/cart`);
      console.log(
        "🔄 [Revalidate] - Nuovo carrello creato, revalidate avviato"
      );

      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      if (!cart.items) cart.items = [];
      console.log("📦 [Carrello] - Carrello esistente trovato:", cart);

      // ✅ Controlla se l'oggetto è già nel carrello
      const existItem = cart.items.find((x) => x.productId === item.productId);

      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          console.error("❌ [Stock] - Not enough stock");
          throw new Error("Not enough stock");
        }

        cart.items = cart.items.map((x) =>
          x.productId === item.productId ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        if (product.stock < 1) {
          console.error("❌ [Stock] - Not enough stock");
          throw new Error("Not enough stock");
        }

        cart.items = [...cart.items, item];
      }

      // Ensure item images are strings
      cart.items = cart.items.map((item) => {
        if (Array.isArray(item.image)) {
          item.image = item.image[0];
        }
        return item;
      });
      console.log("🔍 [Controllo] -", cart.items, item.productId);

      const updateCart = await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as ICartItem[]),
        },
      });
      console.log(
        "✅ [Aggiornamento] - Carrello aggiornato nel database",
        updateCart
      );

      revalidatePath(`/cart`);
      console.log("🔄 [Revalidate] - Revalidate del carrello avviato");

      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : "added to"
        } cart`,
      };
    }
  } catch (error) {
    console.error("❌ [Errore] - Error in addItemToCart:", error); // Debugging migliorato
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export const getMyCart = async () => {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });

  if (!cart) return null;

  const { data, success, error } = cartSchema.safeParse(cart);

  if (!success) {
    console.error("❌ Errore nella validazione del carrello:", error.format());
    throw new Error("Errore di validazione del carrello");
  }

  return {
    ...convertToPlainObject(data),
    success: true,
    message: "Carrello creato",
  };
};

export async function removeItemFromCart(productId: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    // Get user cart from database
    const cart: { id: string; items: ICartItem[] } | null = await getMyCart();
    if (!cart) throw new Error("Cart not found");
    if (!cart || "success" in cart) throw new Error("Cart not found");

    // Check for item in cart
    const exist = cart.items.find((i) => i.productId === productId);

    // Se l'elemento esiste, aggiorniamo la quantità senza rimuoverlo dalla UI
    if (exist) {
      if (exist.qty === 1) {
        // Invece di rimuoverlo, impostiamo qty = 0
        exist.qty = 0;
      } else {
        exist.qty -= 1;
      }
    }

    // Aggiorniamo il carrello nel database
    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as ICartItem[]),
      },
    });

    // Forza aggiornamento della UI dopo la modifica
    revalidatePath(`/cart`);
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} updated in cart`,
      data: JSON.parse(JSON.stringify(updatedCart)),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function cancelItemFromCart(productId: string) {
  try {
    const cart = await getMyCart();
    if (!cart || !("items" in cart)) throw new Error("Carrello non trovato");

    if (!("items" in cart)) throw new Error("Invalid cart format");

    const exist = cart.items.find((i) => i.productId === productId);
    if (!exist) throw new Error("Prodotto non presente nel carrello");

    cart.items = cart.items.filter((i) => i.productId !== productId);

    const cartUpdated = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items),
      },
    });

    revalidatePath(`/cart`);
    revalidatePath(`/product/${exist.slug}`);

    const { data, success } = cartSchema.safeParse(cartUpdated);

    console.log("🗑 [Cancellazione] - Prodotto rimosso dal carrello:", {
      ...convertToPlainObject(data),
    });

    return {
      /*  success,
      message: `Rimosso completamente ${exist.name} dal carrello`, */
      ...convertToPlainObject(data),
    };
  } catch (error) {
    console.error("❌ Errore in cancelItemFromCart:", error);
    /*  return { success: false, message: formatError(error) }; */
  }
}
