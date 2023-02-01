import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";

import { locales, stubDefault, realDefault } from "../i18n.mjs";

const PUBLIC_FILE = /\.(.*)$/;

acceptLanguage.languages(locales);

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === stubDefault) {
    const locale =
      acceptLanguage.get(req.headers.get("Accept-Language")) ?? realDefault;

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
}
