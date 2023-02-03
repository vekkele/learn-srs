import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { Locale } from "../../i18n.mjs";
import { defaultLocale, localeNames, locales } from "../../i18n.mjs";

const isLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);

interface LanguageSwitchProps {
  className?: string;
}

const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const { push, pathname, query, asPath, locale = defaultLocale } = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLocale(locale)) {
      console.error(`current locale ${locale} is not supported`);

      push({ pathname, query }, asPath, { locale: defaultLocale }).catch(
        (e) => {
          console.error(e);
        }
      );
    }
  }, [locale, push, asPath, pathname, query]);

  if (!isLocale(locale)) {
    return <></>;
  }

  const anotherLocale = locale === "en" ? "ru" : "en";

  const localeName = localeNames[locale];

  return (
    <section className={className}>
      <span>{t("language")}: </span>
      <Link
        href={{ pathname, query }}
        as={asPath}
        locale={anotherLocale}
        className="hover:underline"
      >
        {localeName}
      </Link>
    </section>
  );
};

export default LanguageSwitch;
