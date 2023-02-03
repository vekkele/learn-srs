import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../next-i18next.config.mjs";
import { defaultLocale } from "../../i18n.mjs";

export const getServerTranslations = async (
  locale = defaultLocale,
  namespaces = ["common"]
) => {
  return serverSideTranslations(locale, namespaces, nextI18nConfig);
};
