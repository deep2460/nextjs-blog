// src/middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/admin/login', '/admin/signup'];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log('🧠 Middleware hit:', pathname);

  // Skip public pages
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('admin-token')?.value;

    if (!token) {
      console.warn('❌ No token — redirecting to /admin/login');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log('✅ JWT verified successfully');
      return NextResponse.next();
    } catch (err) {
      console.error('⛔ Invalid JWT — redirecting to /admin/login');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

