import { auth } from "@/auth";
import Header from "@/components/admin/common/Header";
import MenuEditor from "@/components/admin/mega-menu-config/menu-editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UploadFiles from "./upload-files";
import UploadImage from "./upload-images";

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
            <AccordionTrigger>Carica file</AccordionTrigger>
            <AccordionContent className="h-96">
              <UploadFiles />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Carica Immagine</AccordionTrigger>
            <AccordionContent>
              <UploadImage />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
};
export default SettingsPage;
