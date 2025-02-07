import { APP_NAME, SENDER_EMAIL } from "@/lib/constants";
import { IOrder } from "@/types/_index";
import { Resend } from "resend";
import PurchaseReceiptEmail from "./purchase.receipt";

require("dotenv").config();

const resend = new Resend(
  (process.env.RESEND_API_KEY as string) ||
    "re_NadEpwJe_8XhyMfe2BvyTUJ6VuhdxGNdB"
);

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order?.user?.email as string,
    subject: `${APP_NAME} - Abbiamo confermato l'ordine #${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
};
