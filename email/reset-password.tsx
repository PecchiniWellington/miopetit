import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

ResetPasswordEmail.PreviewProps = {
  user: {
    name: "Wellington",
    email: "wellintone.creative@gmail.com",
    resetLink: "https://yourdomain.com/reset-password?token=abc123",
  },
};

type ResetPasswordProps = {
  user: {
    name: string;
    email: string;
    resetLink: string;
  };
};

export default function ResetPasswordEmail({
  user,
  resetUrl,
}: {
  user: ResetPasswordProps;
  resetUrl: string;
}) {
  return (
    <Html>
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans">
          <Container className="max-w-xl rounded-lg bg-white p-6 shadow-md">
            <Section className="text-center">
              <Img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`}
                alt="Logo"
                className="mx-auto mb-4"
                width="120"
              />
              <Heading className="text-2xl font-bold text-gray-800">
                Password Reset Request
              </Heading>
              <Text className="mt-2 text-gray-600">
                Hi {user?.user?.name}, it seems like you requested a password
                reset.
              </Text>
              <Text className="mt-2 text-gray-600">
                Click the button below to reset your password:
              </Text>
              <Link
                href={resetUrl}
                className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Reset Password
              </Link>
              <Text className="mt-6 text-gray-600">
                If you did not request this, please ignore this email. Your
                password will remain unchanged.
              </Text>
              <Text className="mt-8 text-sm text-gray-500">
                If you’re having trouble clicking the button, copy and paste the
                URL below into your web browser:
              </Text>
              <Text className="break-all text-sm text-blue-600">
                {resetUrl}
              </Text>
            </Section>
            <Section className="mt-6 border-t border-gray-300 pt-4 text-center">
              <Text className="text-xs text-gray-500">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
