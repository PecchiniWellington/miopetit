"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import GenericCard from "@/components/shared/brand-components/brand-card";
import { Switch } from "@/components/ui/switch";
import {
  CheckCircle,
  Globe,
  Mail,
  Settings,
  Smartphone,
  Trash2,
} from "lucide-react";
import { JSX, useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Conferma Ordine",
    message: "Il tuo ordine #1234 è stato confermato!",
    date: "2 ore fa",
    read: false,
  },
  {
    id: "2",
    title: "Spedizione in arrivo",
    message: "Il tuo pacco è in viaggio e sarà consegnato presto.",
    date: "1 giorno fa",
    read: true,
  },
  {
    id: "3",
    title: "Promozione Speciale 🎉",
    message: "Sconto del 20% sui tuoi prodotti preferiti!",
    date: "3 giorni fa",
    read: false,
  },
];

export default function ProfileNotificationsTab() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="space-y-8 p-6">
      {/* 🔔 Titolo */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          🔔 Notifiche
        </h2>
        <BrandButton variant="flat" icon={<Settings className="size-5" />}>
          Preferenze Notifiche
        </BrandButton>
      </div>

      {/* 📩 Lista Notifiche */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <GenericCard
              title={
                <>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">
                    {notif.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {notif.message}
                  </p>
                  <span className="text-xs text-gray-500">{notif.date}</span>
                </>
              }
              key={notif.id}
              className={`shadow-md ${notif.read ? "opacity-70" : "bg-yellow-50 dark:bg-gray-900"} transition-all`}
            >
              <div className="flex gap-2">
                {!notif.read && (
                  <BrandButton
                    variant="flat"
                    onClick={() => markAsRead(notif.id)}
                  >
                    <CheckCircle className="size-5 text-green-600 hover:text-green-700" />
                  </BrandButton>
                )}
                <BrandButton
                  variant="flat"
                  onClick={() => deleteNotification(notif.id)}
                >
                  <Trash2 className="size-5 text-red-600 hover:text-red-700" />
                </BrandButton>
              </div>
            </GenericCard>
          ))
        ) : (
          <p className="text-center text-gray-500">Nessuna notifica recente</p>
        )}
      </div>

      {/* ⚙️ Gestione Preferenze */}
      <div className="space-y-6 rounded-lg border p-6 shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          ⚙️ Preferenze Notifiche
        </h3>
        <NotificationSetting
          label="Notifiche Email"
          icon={<Mail className="size-5 text-blue-600" />}
        />
        <NotificationSetting
          label="Notifiche SMS"
          icon={<Smartphone className="size-5 text-green-600" />}
        />
        <NotificationSetting
          label="Notifiche Push"
          icon={<Globe className="size-5 text-purple-600" />}
        />
      </div>
    </div>
  );
}

/** 📌 Componente per ogni impostazione */
const NotificationSetting = ({
  label,
  icon,
}: {
  label: string;
  icon: JSX.Element;
}) => {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-lg font-medium">{label}</span>
      </div>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
};
