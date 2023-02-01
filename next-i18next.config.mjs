//@ts-check
import path from "path";
import i18n from "./i18n.mjs";

/** @type {import("next-i18next").UserConfig} */
const config = {
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: i18n,
  localePath: path.resolve("./public/locales"),
};

export default config;
