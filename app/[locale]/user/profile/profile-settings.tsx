"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import GenericModal from "@/components/shared/modals/delete-dialog";
import LanguageSwitcher from "@/components/shared/selects/switcher-language";
import { deleteUserAccount } from "@/core/actions/user";
import { AlertTriangle, Check, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

const SettingsTab = () => {
  const t = useTranslations("Profile.SettingsTab");

  const handleDelete = async () => {
    try {
      const response = await deleteUserAccount();
      console.log("Risposta:", response);
    } catch (error) {
      console.log("Errore nell'eliminazione dell'account" + error);
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
        <BrandButton icon={<Check className="mr-2 size-5" />}>
          {t("save_changes")}
        </BrandButton>

        {/* 🗑️ Elimina Account */}
        <div className="mt-6 rounded-lg border border-red-500 bg-red-50 p-6 shadow-md dark:border-red-700 dark:bg-red-900">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-200">
            {t("delete_account")}
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300">
            {t("delete_account_message")}
          </p>

          <GenericModal
            btnClassName="mt-6"
            modalClassName="border-red-500 border-2"
            triggerButton={
              <BrandButton
                variant="danger"
                icon={<Trash2 className="mr-2 size-5" />}
              >
                {t("delete_account_button")}
              </BrandButton>
            }
            title={t("delete_account_modal.title")}
            description={t("delete_account_modal.description")}
            confirmText={t("delete_account_modal.delete_button")}
            cancelText={t("delete_account_modal.cancel_button")}
            icon={<AlertTriangle className="size-5 text-red-500" />}
            variant="danger"
            onConfirm={() => handleDelete()}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
