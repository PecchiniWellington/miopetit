"use client";

import LanguageSwitcher from "@/components/switcher-language";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteUserAccount } from "@/core/actions/user";
import { AlertTriangle, Check, Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const SettingsTab = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Profile.SettingsTab");

  const handleDelete = async () => {
    try {
      const response = await deleteUserAccount();
      console.log("Risposta:", response);

      setOpen(false);
    } catch (error) {
      console.log("Errore nell'eliminazione dell'account" + error);
      setOpen(false);
    }
  };

  return (
    <div className="rounded-lg bg-white  dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("title")}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t("manage_your_settings")}
      </p>

      <div className="mt-6 space-y-6">
        {/* 🌍 Selezione della Lingua */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {t("language")}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("select_language")}
            </p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* 🔔 Notifiche */}
        {/* <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              🔔 Notifiche
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Attiva/disattiva le notifiche
            </p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div> */}

        {/* 🔒 Autenticazione a Due Fattori */}
        {/* <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              🔒 Autenticazione 2FA
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Aggiungi un ulteriore livello di sicurezza
            </p>
          </div>
          <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
        </div> */}

        {/* 🚀 Salva le Modifiche */}
        <Button className="w-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700">
          <Check className="mr-2 size-5" />
          {t("save_changes")}
        </Button>

        {/* 🗑️ Elimina Account */}
        <div className="mt-6 rounded-lg border border-red-500 bg-red-50 p-6 shadow-md dark:border-red-700 dark:bg-red-900">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-200">
            {t("delete_account")}
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300">
            {t("delete_account_message")}
          </p>

          <Button
            variant="destructive"
            className="mt-4 w-full bg-red-600 text-white shadow-md transition-all hover:bg-red-700 focus:ring-2 focus:ring-red-400"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 size-5" />
            {t("delete_account_button")}
          </Button>

          {/* Modale di conferma */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-lg border border-red-600 bg-white shadow-xl dark:border-red-500 dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-300">
                  <AlertTriangle className="size-6 text-red-500 dark:text-red-300" />
                  {t("delete_account_modal.title")}
                </DialogTitle>
              </DialogHeader>
              <p className="text-md text-gray-700 dark:text-gray-300">
                {t("delete_account_modal.description")}
              </p>

              <DialogFooter className="flex justify-between">
                <Button
                  variant="outline"
                  className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setOpen(false)}
                >
                  <X className="mr-2 size-5" />
                  {t("delete_account_modal.cancel_button")}
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-600 text-white shadow-md hover:bg-red-700"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 size-5" />
                  {t("delete_account_modal.delete_button")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
