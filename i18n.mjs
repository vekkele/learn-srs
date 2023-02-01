//@ts-check
export const locales = ["en", "ru"];

export const stubDefault = "default";
export const realDefault = "en";

/** @type {NonNullable<import("next").NextConfig["i18n"]>} */
const i18n = {
  locales: [stubDefault, ...locales],
  defaultLocale: stubDefault,
};

export default i18n;
