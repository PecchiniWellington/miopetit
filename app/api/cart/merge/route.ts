import { addItemToCart } from "@/core/actions/cart/cart.actions";
import { prisma } from "@/core/prisma/prisma";
import { ICart, ICartItem } from "@/core/validators";
import { cartSchema } from "@/core/validators/cart.validator";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let requestBody;

  try {
    requestBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }

  console.log("Request body:", requestBody);

  if (!requestBody || typeof requestBody !== "object") {
    return NextResponse.json(
      { error: "Missing request body" },
      { status: 400 }
    );
  }

  const { userId, localCart } = requestBody;

  if (!userId || !Array.isArray(localCart)) {
    return NextResponse.json(
      { error: "Missing or invalid data" },
      { status: 400 }
    );
  }

  const userCart = await prisma.cart.findMany({
    where: { userId },
  });

  console.log("User cart:", userCart);

  const cartParse = cartSchema.parse(userCart);

  if (cartParse.items.length === 0) {
    for (const item of localCart) {
      await addItemToCart({
        userId,
        productId: item.productId,
        qty: item.qty,
        price: item.price,
        image: item.image,
        name: item.name,
        slug: item.slug,
      });
    }
    return NextResponse.json({
      success: true,
      message: "Carrello creato e sincronizzato",
    });
  }

  const mergedCart = mergeCarts(cartParse, localCart);

  for (const item of mergedCart) {
    await addItemToCart({
      userId,
      productId: item.productId,
      qty: item.qty,
      price: item.price,
      image: item.image,
      name: item.name,
      slug: item.slug,
    });
  }

  return NextResponse.json({
    success: true,
    message: "Carrello aggiornato con il merge",
  });
}

// 🔹 Funzione per unire i carrelli
function mergeCarts(cartParse: ICart, localCart: ICartItem[]) {
  const cartMap = new Map();

  [...cartParse.items, ...localCart].forEach((item) => {
    if (cartMap.has(item.productId)) {
      cartMap.get(item.productId).qty += Number(item.qty);
    } else {
      cartMap.set(item.productId, {
        ...item,
        qty: Number(item.qty),
        itemsPrice: Number(item.price) * Number(item.qty),
      });
    }
  });

  return Array.from(cartMap.values());
}
