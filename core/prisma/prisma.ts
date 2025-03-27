import { neonConfig, Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });

const adapter = new PrismaNeon(pool);

export const prisma = new PrismaClient({
  /* log: ["error"], */

  adapter: adapter,
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
