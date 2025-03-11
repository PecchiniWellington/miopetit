import sampleData from "@/core/db-static/sample-data";
import { ICartItem, IOrder } from "@/core/validators";
import { formatCurrency } from "@/lib/utils";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

ShippingConfirmationEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: "123",
    user: {
      name: "Wellington",
      email: "test@test.com",
    },
    paymentMethod: "PayPal",
    shippingAddress: {
      fullName: "Wellington",
      street: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "USA",
    },
    createdAt: new Date(),
    totalPrice: "100",
    taxPrice: "5",
    shippingPrice: "10",
    itemsPrice: "80",
    orderitems: sampleData.products.map((product) => ({
      name: product.name,
      orderId: "123",
      productId: "123",
      slug: product.slug,
      qty: product.stock,
      image: product.images[0],
      price: product.price.toString(),
    })),
    isDelivered: false,
    trackingNumber: "ABC123456789",
    trackingUrl: "https://corriere-fittizio.com/tracking/ABC123456789",
  },
};

type ShippingInformationProps = {
  order: IOrder & { trackingNumber: string; trackingUrl: string };
};

export default function ShippingConfirmationEmail({
  order,
}: ShippingInformationProps) {
  return (
    <Html>
      <Preview>Il tuo ordine è in viaggio!</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-xl">
            <Heading>🚚 Il tuo ordine è stato spedito!</Heading>
            <Text className="text-gray-600">
              Ciao {order.user.name}, il tuo ordine{" "}
              <b>#{order.id.toString()}</b> è stato spedito ed è in viaggio
              verso di te! 🎉
            </Text>

            <Section className="mt-4 rounded-lg border border-gray-300 p-4">
              <Heading className="text-lg">
                📦 Dettagli della Spedizione
              </Heading>
              <Text>
                <b>Corriere:</b> Express Delivery <br />
                <b>Numero di Tracking:</b> {order.trackingNumber}
              </Text>
              <Button
                className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                href={order.trackingUrl}
              >
                📍 Traccia il tuo pacco
              </Button>
            </Section>

            <Section className="my-6 rounded-lg border border-gray-300 p-4">
              <Heading className="text-lg">🏡 Indirizzo di Spedizione</Heading>
              <Text>
                {order.shippingAddress.fullName} <br />
                {order.shippingAddress.street} <br />
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}{" "}
                <br />
                {order.shippingAddress.country}
              </Text>
            </Section>

            <Section className="rounded-lg border border-gray-300 p-4">
              <Heading className="text-lg">
                🛍️ Riepilogo dell&apos;Ordine
              </Heading>
              {order.orderitems.map((item: ICartItem) => (
                <Row key={item.productId} className="mt-4">
                  <Column>
                    {item.image ? (
                      <Img
                        width="80"
                        className="rounded"
                        src={
                          (item.image ?? "").startsWith("/")
                            ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`
                            : item.image
                        }
                        alt={item.name}
                      />
                    ) : null}
                  </Column>
                  <Column className="align-top">
                    {item.name} x {item.qty}
                  </Column>
                  <Column align="right" className="align-top">
                    {formatCurrency(item.price)}
                  </Column>
                </Row>
              ))}

              {[
                { name: "Subtotale", price: order.itemsPrice },
                { name: "Spedizione", price: order.shippingPrice },
                { name: "Tasse", price: order.taxPrice },
                { name: "Totale", price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="py-1">
                  <Column align="right">{name}:</Column>
                  <Column align="right" width={70} className="align-top">
                    <Text className="m-0">{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>

            <Text className="mt-6 text-gray-600">
              Grazie per aver acquistato con noi! Se hai domande, rispondi a
              questa email e saremo felici di aiutarti. 💙
            </Text>

            <Text className="text-sm text-gray-500">- Il Team MioPetit 🐾</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
