"use server";

import { CartItem, Product } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { Cart } from "@prisma/client";
import { cartItemSchema, insertCartSchema } from "../validator";
import { revalidatePath } from "next/cache";

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
const pushProductToDatabase = async (
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
    message: "Item added to cart successfully",
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    const { sessionCartId } = await getSessionCartId();
    const { userId } = await getSessionAndUserId();
    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);
    const { product } = await getProductByItemProductId(item);

    if (!cart) {
      const t = await pushProductToDatabase(
        userId,
        item,
        sessionCartId,
        product
      );

      return t;
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
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
