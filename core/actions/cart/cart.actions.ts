"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import {
  cartItemSchema,
  ICart,
  ICartItem,
  IInsertProduct,
  insertCartSchema,
} from "@/core/validators";
import { convertToPlainObject, formatError, round2 } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/* TODO: controllare cart che potrebbe causare problemi soprattuto epr l'id */

// Calculate cart prices
const calcPrice = (items: ICartItem[]) => {
  const itemsPrice = items.reduce(
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
const getSessionCartId = async () => {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");
  return { sessionCartId };
};

// Get session and user Id
const getSessionAndUserId = async () => {
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;
  return { userId };
};

// Find product in database by item.productId
const getProductByItemProductId = async (item: ICartItem) => {
  const product = await prisma.product.findFirst({
    where: { id: item.id },
  });
  if (!product) throw new Error("Product not found");

  return {
    product,
  };
};

// Add item to cart
const createNewCart = async (
  userId: string | undefined,
  item: ICartItem,
  sessionCartId: string,
  product: IInsertProduct
) => {
  // Create new cart obj
  const newCart = insertCartSchema.parse({
    userId: userId,
    items: [item],
    sessionCartId: sessionCartId,
    ...calcPrice([item]),
  });

  // Add new cart to database
  await prisma.cart.create({ data: newCart });

  // revalidate product page from cache to update cart count
  revalidatePath(`/product/${product.slug}`);

  return {
    success: true,
    message: `${product.name} added to cart successfully`,
  };
};

const updateExistingCart = async (
  cart: ICart & { id: string },
  item: ICartItem,
  product: IInsertProduct
) => {
  // Update existing cart in database
  const existingItem = (cart.items as ICartItem[]).find(
    (i) => i.id === item.id
  );

  // check if item exists
  if (existingItem) {
    // check if there is enough stock
    if (product.stock === null || product.stock < existingItem.qty + 1) {
      throw new Error("Not enough stock");
    }
    existingItem.qty = existingItem.qty + 1;
  } else {
    // add new item
    if (product.stock === null || product.stock < 1)
      throw new Error("Not enough stock");
    cart.items.push(item);
  }
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: cart.items as Prisma.CartUpdateitemsInput[],
      ...calcPrice(cart.items as ICartItem[]),
    },
  });

  revalidatePath(`/product/${product.slug}`);
  return {
    success: true,
    message: `${product.name} ${
      existingItem ? "updated in " : "added to"
    } cart`,
  };
};

/* EXPORTS ACTION CART */
export async function addItemToCart(data: ICartItem) {
  try {
    console.log("📥 [addItemToCart] - Data ricevuta:", data);

    // ✅ Controlla il cookie del carrello
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    console.log("🍪 [Cookie] - sessionCartId:", sessionCartId);

    if (!sessionCartId) throw new Error("Cart session not found");

    // ✅ Ottieni sessione utente
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    console.log("🔑 [Session] - userId:", userId);

    // ✅ Ottieni carrello corrente
    const cart = await getMyCart();
    console.log("🛒 [Carrello] - Stato iniziale del carrello:", cart);

    // ✅ Valida l'oggetto item
    const item = cartItemSchema.parse({ ...data, image: data.image[0] });
    console.log("✅ [Validazione] - Item valido:", item);

    // ✅ Trova il prodotto nel database
    const product = await prisma.product.findFirst({
      where: { id: item.id }, // Usa `productId` invece di `id`
    });
    console.log("🔎 [DB] - Prodotto trovato:", product);

    if (!product) throw new Error("Product not found");

    // ✅ Se il carrello non esiste, creane uno nuovo
    if (!cart) {
      console.log(
        "🆕 [Carrello] - Nessun carrello trovato, creazione di uno nuovo"
      );

      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      console.log("🆕 [Nuovo Carrello] - Schema del nuovo carrello:", newCart);

      await prisma.cart.create({ data: newCart });

      revalidatePath(`/cart`);
      console.log(
        "🔄 [Revalidate] - Nuovo carrello creato, revalidate avviato"
      );

      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      // ✅ Assicurati che cart.items sia un array
      if (!cart.items) cart.items = [];
      console.log("📦 [Carrello] - Carrello esistente trovato:", cart);

      // ✅ Controlla se l'oggetto è già nel carrello
      const existItem = cart.items.find((x) => x.id === item.id);
      console.log(
        "🔍 [Esistenza] - Prodotto esiste nel carrello?",
        existItem ? "✅ Sì" : "❌ No"
      );

      if (existItem) {
        console.log("🔄 [Update] - Aumento la quantità per l'item:", existItem);

        // Controlla disponibilità stock
        if (product.stock < existItem.qty + 1) {
          console.error("❌ [Stock] - Not enough stock");
          throw new Error("Not enough stock");
        }

        // ✅ Rigenera l'array per forzare l'aggiornamento
        cart.items = cart.items.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        console.log("➕ [Aggiunta] - Aggiungo un nuovo item al carrello");

        if (product.stock < 1) {
          console.error("❌ [Stock] - Not enough stock");
          throw new Error("Not enough stock");
        }

        cart.items = [...cart.items, item];
      }

      console.log(
        "💾 [Prima del Salvataggio] - Stato finale del carrello:",
        cart.items
      );

      // ✅ Aggiorna carrello nel database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as ICartItem[]),
        },
      });
      console.log("✅ [Aggiornamento] - Carrello aggiornato nel database");

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

export async function getMyCart() {
  const { sessionCartId } = await getSessionCartId();
  const { userId } = await getSessionAndUserId();

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  console.log("CART", cart);

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    id: cart.id,
    items: cart.items as ICartItem[],
    itemsPrice: cart.itemsPrice.toString() as unknown as Prisma.Decimal,
    totalPrice: cart.totalPrice.toString() as unknown as Prisma.Decimal,
    shippingPrice: cart.shippingPrice.toString() as unknown as Prisma.Decimal,
    taxPrice: cart.taxPrice.toString() as unknown as Prisma.Decimal,
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    await getSessionCartId();
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    // Get user cart from database
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    // Check for item in cart
    const exist = (cart.items as ICartItem[]).find((i) => i.id === productId);

    // Check if only one item in qty
    if (exist) {
      if (exist?.qty === 1) {
        cart.items = (cart.items as ICartItem[])?.filter(
          (i) => i.id !== exist.id
        );
      } else {
        // Update item qty
        exist.qty = exist.qty - 1;
      }
    }

    const cartRemoved = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as ICartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} removed from cart`,
      data: JSON.parse(JSON.stringify(cartRemoved)),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
