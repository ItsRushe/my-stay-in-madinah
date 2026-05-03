import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_COOKIE = 'msm_admin_session';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const isLoginPage = pathname === '/admin/login';
  const hasSession = request.cookies.get(ADMIN_COOKIE)?.value === 'authenticated';

  if (!hasSession && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (hasSession && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
