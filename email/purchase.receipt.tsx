import sampleData from "@/core/db-static/sample-data";
import { ICartItem, IOrder } from "@/core/validators";
import { formatCurrency } from "@/lib/utils";
import {
  Body,
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

PurchaseReceiptEmail.PreviewProps = {
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
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: "123",
      status: "success",
      update_time: new Date(),
      email_address: "test@test.com",
    },
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

type OrderInformationProps = {
  order: IOrder;
};

export default function PurchaseReceiptEmail({ order }: OrderInformationProps) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">
                    Order ID
                  </Text>
                  <Text className="mr-4 mt-0">{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">
                    Purchase Date
                  </Text>
                  <Text className="mr-4 mt-0">
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">
                    Price Paid
                  </Text>
                  <Text className="mr-4 mt-0">
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="my-4 rounded-lg border border-solid border-gray-500 p-4 md:p-6">
              <Heading>Shipping Address</Heading>
              {order.orderitems.map((item: ICartItem) => (
                <Row key={item.productId} className="mt-8">
                  <Column>
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
                { name: "Items", price: order.itemsPrice },
                { name: "Shipping", price: order.shippingPrice },
                { name: "Tax", price: order.taxPrice },
                { name: "Total", price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="py-1">
                  <Column align="right">{name}:</Column>
                  <Column align="right" width={70} className="align-to">
                    <Text className="m-0">{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
