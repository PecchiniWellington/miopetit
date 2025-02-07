import { auth } from "@/auth";
import DynamicButton from "@/components/dynamic-button";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyCart } from "@/core/actions/cart.actions";
import { getUserById } from "@/core/actions/user/user.action";
import { formatCurrency } from "@/lib/utils";
import { IShippingAddress } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PlaceOrderForm from "./place-order-form";

export const metadata: Metadata = {
  title: "Place Older",
};

const PlaceOlderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    /* TODO: inserire le agevolazioni se ti autentichi */
    return <div>No orders here</div>;
  } else {
    const user = await getUserById(userId);
    if (!cart || cart.items.length === 0) redirect("/cart");
    if (!user.address) redirect("/shipping-address");
    if (!user.paymentMethod) redirect("/payment-method");

    const userAddress = user.address as IShippingAddress;

    return (
      <>
        <CheckoutSteps current={3} />
        <h1 className="py-4 text-2xl">Place Order</h1>
        <div className="grid md:grid-cols-3 md:gap-5">
          <div className="space-y-4 overflow-x-auto md:col-span-2">
            <Card>
              <CardContent className="gap-4 p-4">
                <h2 className="pb-4 text-xl">Shipping Address</h2>
                <p>{userAddress.fullname}</p>
                <p>
                  {userAddress.streetAddress}, {userAddress.city}{" "}
                  {userAddress.postalCode}, {userAddress.country}{" "}
                </p>
                <div className="mt-3">
                  <DynamicButton>
                    <Link href="/shipping-address">Edit </Link>
                  </DynamicButton>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="gap-4 p-4">
                <h2 className="pb-4 text-xl">Payment Method</h2>
                <p>{user.paymentMethod}</p>

                <div className="mt-3">
                  <DynamicButton>
                    <Link href="/payment-method">Edit</Link>
                  </DynamicButton>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="gap-4 p-4">
                <h2 className="pb-4 text-xl">Order Items</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.items.map((item) => (
                      <TableRow key={item.slug}>
                        <TableCell>
                          <Link
                            href={`/product/${item.slug}`}
                            className="flex items-center"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />

                            <span className="px-2">{item.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/product/${item.slug}`}>
                            <span className="px-2">{item.qty}</span>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/product/${item.slug}`}>
                            <span className="px-2">
                              {formatCurrency(item?.price)}
                            </span>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardContent className="gap-4 space-y-4 p-4">
                <div className="flex justify-between">
                  <div>Items</div>
                  <div>
                    {formatCurrency(cart?.itemsPrice as unknown as string)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Tax</div>
                  <div>
                    {formatCurrency(cart?.taxPrice as unknown as string)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Shipping</div>
                  <div>
                    {formatCurrency(cart?.shippingPrice as unknown as string)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Total</div>
                  <div>
                    {formatCurrency(cart?.totalPrice as unknown as string)}
                  </div>
                </div>
                <PlaceOrderForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }
};

export default PlaceOlderPage;
