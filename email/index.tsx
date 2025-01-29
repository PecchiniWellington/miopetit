import { Resend } from "resend";
import { APP_NAME, SENDER_EMAIL } from "@/lib/constants";
import PurchaseReceiptEmail from "./purchase.receipt";

require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPurchaseReceipt = async (order: any) => {
  try {
    await resend.emails.send({
      from: `${APP_NAME} <${SENDER_EMAIL}>`,
      to: order.user?.email,
      subject: `${APP_NAME} - Abbiamo confermato l'ordine #${order.id}`,
      react: <PurchaseReceiptEmail order={order} />,
    });
  } catch (error) {
    console.error(error);
  }
};
