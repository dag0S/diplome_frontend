import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import { EnumTokens } from "./src/services/auth/auth-token.service";
import { Role } from "./src/types/role.enum";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const middleware = async (req: NextRequest) => {
  const refreshToken = req.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = ["login", "register", "verify-email", "verify-2fa"].some(
    (url) => req.url.includes(url),
  );

  if (isAuthPage) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  try {
    const { payload } = await jwtVerify(refreshToken, JWT_SECRET);

    const role = payload.role;

    const pathname = req.nextUrl.pathname;

    if (
      pathname.startsWith("/personal-account/patient") &&
      role !== Role.PATIENT
    ) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }

    if (
      pathname.startsWith("/personal-account/doctor") &&
      role !== Role.DOCTOR
    ) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: [
    "/personal-account/patient",
    "/personal-account/doctor",
    "/consultations/:path*",
    "/login",
    "/register",
    "/verify-email",
    "/verify-2fa",
  ],
};
