import { neonConfig, Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

/* const connection = neon(`${process.env.DATABASE_URL}`, {
  arrayMode: false,
  fullResults: true,
});
const adapter = new PrismaNeonHTTP(connection); */

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const pool = new Pool({ connectionString });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool);

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.

export const prisma = new PrismaClient({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: adapter as unknown as any,
}).$extends({
  result: {
    product: {
      price: {
        needs: { price: true },
        compute(product) {
          return product?.price?.toString();
        },
      },
      rating: {
        compute(product) {
          return product?.rating ? product.rating.toNumber() : undefined;
        },
      },
      /*  rating: {
        compute(product) {
          return product?.rating?.toString();
        },
      }, */
    },

    unitValue: {
      value: {
        compute(unitValue) {
          return unitValue.value ? unitValue.value.toNumber() : null;
        },
      },
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart?.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart?.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart?.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart?.totalPrice.toString();
        },
      },
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart?.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart?.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart?.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart?.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        compute(orderItem) {
          return orderItem.price.toString();
        },
      },
    },
  },
});

async function testConnection() {
  try {
    await prisma.$connect();
    //console.log("✅ Connessione al database riuscita");
  } catch (error) {
    console.error("❌ Errore di connessione:", error);
  }
}
testConnection();
