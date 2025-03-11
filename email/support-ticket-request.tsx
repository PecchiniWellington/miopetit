import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

type SupportTicketEmailProps = {
  orderId?: string;
  ticketTitle: string;
  message: string;
  userEmail: string;
};

export default function SupportTicketEmail({
  orderId,
  ticketTitle,
  message,
  userEmail,
}: SupportTicketEmailProps) {
  return (
    <Html>
      <Preview>Il tuo ticket di supporto è stato ricevuto</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-xl rounded-lg border border-gray-300 p-6 shadow-lg">
            <Heading className="text-center text-indigo-600">
              📩 Ticket di Supporto Ricevuto
            </Heading>

            <Section className="text-gray-700">
              <Text>Ciao,</Text>
              <Text>
                Abbiamo ricevuto la tua richiesta di supporto e ti risponderemo
                al più presto. Qui di seguito i dettagli del tuo ticket:
              </Text>
            </Section>

            {/* Info Ticket */}
            <Section className="rounded-lg bg-gray-100 p-4">
              <Row>
                <Column>
                  <Text className="font-semibold">📌 Titolo:</Text>
                  <Text className="text-gray-900">{ticketTitle}</Text>
                </Column>
              </Row>

              {orderId && (
                <Row className="mt-2">
                  <Column>
                    <Text className="font-semibold">🛒 Ordine Relativo:</Text>
                    <Text className="text-indigo-600">#{orderId}</Text>
                  </Column>
                </Row>
              )}

              <Row className="mt-2">
                <Column>
                  <Text className="font-semibold">📧 Email:</Text>
                  <Text className="text-gray-900">{userEmail}</Text>
                </Column>
              </Row>

              <Row className="mt-2">
                <Column>
                  <Text className="font-semibold">💬 Messaggio:</Text>
                  <Text className="italic text-gray-900">
                    &quot;{message}&quot;
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Conclusione */}
            <Section className="mt-6 text-gray-700">
              <Text>
                Ti contatteremo non appena avremo una soluzione per te. Nel
                frattempo, puoi controllare lo stato del tuo ticket nella tua
                area clienti.
              </Text>
              <Text>Grazie per averci contattato! 😊</Text>
            </Section>

            <Section className="mt-6 text-center">
              <Text className="text-sm text-gray-500">
                Se hai bisogno di ulteriore assistenza, puoi rispondere a questa
                email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
