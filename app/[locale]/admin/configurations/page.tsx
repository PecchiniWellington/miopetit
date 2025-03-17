import { auth } from "@/auth";
import Header from "@/components/admin/common/Header";
import AccordionConfiguration from "./accordion-configuration";

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
        <AccordionConfiguration />
      </main>
    </div>
  );
};
export default SettingsPage;
