import { IOrder } from "@/core/validators";
import { APP_NAME, SENDER_EMAIL } from "@/lib/constants";
import { Resend } from "resend";
import PurchaseReceiptEmail from "./purchase.receipt";
import ResetPasswordEmail from "./reset-password";
import ShippingConfirmationEmail from "./shipping-confirmation";
import SupportTicketEmail from "./support-ticket-request";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const resend = new Resend(
  (process.env.RESEND_API_KEY as string) ||
    "re_FiWKUKfj_GCuqahrs7g2Uz6tkJcudjr9w"
);

export const sendTicketRequest = async ({
  orderId,
  message,
  userEmail,
  ticketTitle,
}: {
  orderId: string;
  message: string;
  userEmail: string;
  ticketTitle: string;
}) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: userEmail as string,
    subject: `${APP_NAME} - Abbiamo preso in carico la tua richiesta`,
    react: (
      <SupportTicketEmail
        orderId={orderId}
        message={message}
        ticketTitle={ticketTitle}
        userEmail={userEmail}
      />
    ),
  });
};
export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order?.user?.email as string,
    subject: `${APP_NAME} - Abbiamo confermato l'ordine #${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
};
export const sendOrderDeliverEmail = async ({ order }: { order: IOrder }) => {
  console.log("ORDER", { order });
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order?.user?.email as string,
    subject: `${APP_NAME} - Abbiamo spedito il tui ordine #${order.id}`,
    react: <ShippingConfirmationEmail order={order} />,
  });
};

export const sendPasswordResetEmail = async ({
  user,
  resetUrl,
}: {
  user: {
    name: string;
    email: string;
  };
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
