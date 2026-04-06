import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Handle Localization (Redirection from / to default locale, etc.)
  const response = intlMiddleware(request);

  // 2. Handle Auth & RBAC
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_purposes_only" 
  });

  // Check if trying to access admin dashboard (supporting all localized versions)
  const isAdminPath = pathname.match(/^\/(he|en|am)\/admin/);
  if (isAdminPath) {
    if (!token) {
      const loginUrl = new URL(`/${pathname.split('/')[1]}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Only admin can access admin dashboard
    if (token.role !== 'admin') {
      const calculatorUrl = new URL(`/${pathname.split('/')[1]}/calculator`, request.url);
      return NextResponse.redirect(calculatorUrl);
    }
  }

  // Check if trying to access calculator (requires login)
  const isCalculatorPath = pathname.match(/^\/(he|en|am)\/calculator/);
  if (isCalculatorPath && !token) {
    const loginUrl = new URL(`/${pathname.split('/')[1]}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access login/signup while ALREADY authenticated
  const isAuthPage = pathname.match(/^\/(he|en|am)\/(login|signup)/);
  if (isAuthPage && token) {
    const locale = pathname.split('/')[1];
    const targetPath = token.role === 'admin' ? `/${locale}/admin` : `/${locale}/calculator`;
    const redirectUrl = new URL(targetPath, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

// Config ensures middleware only runs on paths that match the Next-Intl and Admin routing
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
