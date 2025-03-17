import { AnimatePresence, motion } from "framer-motion";
import { createContext, ReactNode, useContext, useState } from "react";

// Context to share activeTab state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabsContext = createContext<any>(null);

export const TabsContainer = ({
  children,
  defaultTab,
}: {
  children: ReactNode;
  defaultTab: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  tabs,
  className = "",
}: {
  tabs: { id: string; label: string; icon?: React.ElementType }[];
  className?: string;
}) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <div className={`flex space-x-4 ${className}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 ${
              activeTab === tab.id
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600"
            }`}
          >
            {Icon && <Icon className="size-5" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export const TabsPanel = ({
  tabId,
  children,
  withAnimation = true,
}: {
  tabId: string;
  children: ReactNode;
  withAnimation?: boolean;
}) => {
  const { activeTab } = useContext(TabsContext);

  if (withAnimation) {
    return (
      <AnimatePresence mode="wait">
        {activeTab === tabId && (
          <motion.div
            key={tabId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return activeTab === tabId ? <div>{children}</div> : null;
};
