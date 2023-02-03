import "i18next";
import type common from "../../public/locales/en/common.json";
import type addWord from "../../public/locales/en/addWord.json";
import type auth from "../../public/locales/en/auth.json";
import type dashboard from "../../public/locales/en/dashboard.json";
import type review from "../../public/locales/en/review.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";

    resources: {
      common: typeof common;
      addWord: typeof addWord;
      auth: typeof auth;
      dashboard: typeof dashboard;
      review: typeof review;
    };
  }
}
