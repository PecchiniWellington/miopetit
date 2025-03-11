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

  const userCart = await prisma.cart.findFirst({
    where: { userId },
  });

  if (!userCart) {
    // Se non c'è un carrello per l'utente, creane uno nuovo con il localCart
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
  } else {
    // Se il carrello esiste, facciamo il merge
    const cartParse = cartSchema.parse(userCart);

    if (cartParse.items.length === 0) {
      // Se il carrello esiste ma è vuoto, aggiungiamo tutti gli elementi dal localCart
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
        message: "Carrello sincronizzato con nuovi prodotti",
      });
    }

    // Merge dei carrelli mantenendo le quantità corrette
    const mergedCart = mergeCarts(cartParse, localCart);

    // Aggiorniamo il carrello nel database con i nuovi dati
    await prisma.cart.update({
      where: { id: userCart.id },
      data: {
        items: mergedCart,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Carrello aggiornato con il merge",
    });
  }
}

function mergeCarts(cartParse: ICart, localCart: ICartItem[]) {
  const cartMap = new Map();

  // Aggiungi gli elementi dal carrello utente SENZA modificare la quantità
  cartParse.items.forEach((item) => {
    cartMap.set(item.productId, {
      ...item,
      qty: item.qty, // Mantieni la quantità originale
      itemsPrice: Number(item.price) * Number(item.qty),
    });
  });

  // Aggiungi gli elementi dal localCart SOLO SE sono nuovi, o aggiorna quelli esistenti
  localCart.forEach((item) => {
    if (cartMap.has(item.productId)) {
      // L'elemento esiste in entrambi i carrelli: aggiorna SOLO se è nel localCart
      const existingItem = cartMap.get(item.productId);
      existingItem.qty = existingItem.qty + item.qty; // Somma solo se esiste in entrambi
      existingItem.itemsPrice = Number(existingItem.price) * existingItem.qty;
    } else {
      // L'elemento esiste solo nel localCart: aggiungilo normalmente
      cartMap.set(item.productId, {
        ...item,
        qty: item.qty,
        itemsPrice: Number(item.price) * Number(item.qty),
      });
    }
  });

  return Array.from(cartMap.values());
}
