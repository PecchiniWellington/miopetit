"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { cartItemSchema, insertCartSchema } from "@/core/validators";
import { convertToPlainObject, formatError, round2 } from "@/lib/utils";
import { Cart, CartItem, Product } from "@/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/* TODO: controllare cart che potrebbe causare problemi soprattuto epr l'id */

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
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
const getProductByItemProductId = async (item: CartItem) => {
  const product = await prisma.product.findFirst({
    where: { id: item.productId },
  });
  if (!product) throw new Error("Product not found");

  return {
    product: {
      ...product,
      price: product.price.toString(),
      rating: product.rating.toString(),
    },
  };
};

// Add item to cart
const createNewCart = async (
  userId: string | undefined,
  item: CartItem,
  sessionCartId: string,
  product: Product
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
  cart: Cart & { id: string },
  item: CartItem,
  product: Product
) => {
  // Update existing cart in database
  const existingItem = (cart.items as CartItem[]).find(
    (i) => i.productId === item.productId
  );

  // check if item exists
  if (existingItem) {
    // check if there is enough stock
    if (product.stock < existingItem.qty + 1) {
      throw new Error("Not enough stock");
    }
    existingItem.qty = existingItem.qty + 1;
  } else {
    // add new item
    if (product.stock < 1) throw new Error("Not enough stock");
    cart.items.push(item);
  }
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: cart.items as Prisma.CartUpdateitemsInput[],
      ...calcPrice(cart.items as CartItem[]),
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
export async function addItemToCart(data: CartItem) {
  try {
    const { sessionCartId } = await getSessionCartId();
    const { userId } = await getSessionAndUserId();
    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);
    const { product } = await getProductByItemProductId(item);

    if (!cart) {
      return await createNewCart(userId, item, sessionCartId, product);
    } else {
      return await updateExistingCart(
        {
          ...cart,
          itemsPrice: cart.itemsPrice.toString(),
          totalPrice: cart.totalPrice.toString(),
          shippingPrice: cart.shippingPrice.toString(),
          taxPrice: cart.taxPrice.toString(),
        },
        item,
        product
      );
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
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
    items: cart.items as CartItem[],
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
    const exist = (cart.items as CartItem[]).find(
      (i) => i.productId === productId
    );

    // Check if only one item in qty
    if (exist) {
      if (exist?.qty === 1) {
        cart.items = (cart.items as CartItem[]).filter(
          (i) => i.productId !== exist.productId
        );
      } else {
        // Update item qty
        exist.qty = exist.qty - 1;
      }
    }
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} removed from cart`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
