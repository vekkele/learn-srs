//@ts-check

/** @typedef {NonNullable<import("next").NextConfig["i18n"]>} I18nConfig */
/** @exports @typedef {import("./src/types/utility").Writable<typeof readonlyLocales>} Locales */
/** @exports @typedef {Locales[number]} Locale */

const readonlyLocales = /** @type {const} */ (["en", "ru"]);
export const locales = /** @type {Locales} */ (readonlyLocales);

/** @type {Record<Locale, string>} */
export const localeNames = {
  en: "English",
  ru: "Русский",
};

export const stubDefault = "default";
export const defaultLocale = "en";

/** @type {I18nConfig} */
const i18n = {
  locales: [stubDefault, ...locales],
  defaultLocale: stubDefault,
};

export default i18n;
