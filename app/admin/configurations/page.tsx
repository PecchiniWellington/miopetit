import { auth } from "@/auth";
import Header from "@/components/admin/common/Header";
import MenuEditor from "@/components/mega-menu-config/menu-editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SettingsPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    // Handle the case where session or session.user.id is null or undefined
    throw new Error("User session is not valid");
  }
  return (
    <div className="relative z-10 flex-1 overflow-auto bg-gray-900">
      <Header title="Configuration" />
      <main className="mx-auto max-w-4xl px-4 py-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Configura Menu</AccordionTrigger>
            <AccordionContent className="border border-gray-700">
              <MenuEditor />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Upload files</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Upload Tables?</AccordionTrigger>
            <AccordionContent>
              Yes. Its animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
};
export default SettingsPage;
