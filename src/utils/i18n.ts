import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../next-i18next.config.mjs";

export const getServerTranslations = async (locale: string | undefined) => {
  return await serverSideTranslations(
    locale ?? nextI18nConfig.i18n.defaultLocale,
    ["common"],
    nextI18nConfig,
    nextI18nConfig.i18n.locales
  );
};
