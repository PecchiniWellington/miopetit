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

    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session not found");

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();

    const item = cartItemSchema.parse({
      ...data,
      image: Array.isArray(data.image) ? data.image[0] : data.image,
    });

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
      if (!cart.items) cart.items = [];
      console.log("📦 [Carrello] - Carrello esistente trovato:", cart);

      // ✅ Controlla se l'oggetto è già nel carrello
      const existItem = cart.items.find((x) => x.id === item.id);

      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          console.error("❌ [Stock] - Not enough stock");
          throw new Error("Not enough stock");
        }

        cart.items = cart.items.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
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
export async function cancelItemFromCart(productId: string) {
  try {
    const cart = await getMyCart();
    if (!cart) throw new Error("Carrello non trovato");

    const exist = cart.items.find((i) => i.id === productId);
    if (!exist) throw new Error("Prodotto non presente nel carrello");

    cart.items = cart.items.filter((i) => i.id !== productId);

    const cartUpdated = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items),
      },
    });

    revalidatePath(`/cart`);
    revalidatePath(`/product/${exist.slug}`);

    return {
      success: true,
      message: `Rimosso completamente ${exist.name} dal carrello`,
      data: JSON.parse(JSON.stringify(cartUpdated)),
    };
  } catch (error) {
    console.error("❌ Errore in cancelItemFromCart:", error);
    return { success: false, message: formatError(error) };
  }
}
