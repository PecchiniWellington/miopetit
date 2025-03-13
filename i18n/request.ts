import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "en" | "it" | "es")) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`@/messages/${locale}/${locale}.json`))
    .default;
  const faqMessages = (await import(`@/messages/${locale}/${locale}-faq.json`))
    .default;

  return {
    locale,
    messages: {
      ...messages,
      faq: faqMessages.faq,
    },
  };
});
