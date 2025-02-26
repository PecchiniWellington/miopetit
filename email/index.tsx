import { IOrder } from "@/core/validators";
import { APP_NAME, SENDER_EMAIL } from "@/lib/constants";
import { Resend } from "resend";
import PurchaseReceiptEmail from "./purchase.receipt";
import ResetPasswordEmail from "./reset-password";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const resend = new Resend(
  (process.env.RESEND_API_KEY as string) ||
    "re_FiWKUKfj_GCuqahrs7g2Uz6tkJcudjr9w"
);

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order?.user?.email as string,
    subject: `${APP_NAME} - Abbiamo confermato l'ordine #${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
};

export const sendPasswordResetEmail = async ({
  user,
  resetUrl,
}: {
  user: any;
  resetUrl: string;
}) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: user.email as string,
    subject: `${APP_NAME} - Questo è il link per reimpostare la password`,
    react: <ResetPasswordEmail user={user} resetUrl={resetUrl} />,
  });
  return { success: true, message: "Email di reset inviata!" };
};
