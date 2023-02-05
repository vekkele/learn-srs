import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../next-i18next.config.mjs";
import { defaultLocale } from "../../i18n.mjs";
import type { Namespace } from "i18next";

type RemoveArray<T> = T extends unknown[] ? T : never;
type Namespaces = RemoveArray<Namespace>;
type DefaultNamespaces = (typeof defaultNamespaces)[number];
type AdditionalNamespace = Exclude<Namespaces[number], DefaultNamespaces>;

const defaultNamespaces = ["common"] satisfies Namespaces;

export const getServerTranslations = async (
  locale = defaultLocale,
  namespaces: AdditionalNamespace[] = []
) => {
  return serverSideTranslations(
    locale,
    [...defaultNamespaces, ...namespaces],
    nextI18nConfig
  );
};
