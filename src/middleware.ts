import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const viewType = req.cookies.get('view_type');
  const isProductsPage = req.nextUrl.pathname === '/products';

  if (!viewType && isProductsPage) {
    const newMode = Math.random() < 0.5 ? 'list' : 'grid';

    const newUrl = req.nextUrl.clone();

    const res = NextResponse.redirect(newUrl);
    res.cookies.set('view_type', newMode, {
      maxAge: 60 * 60 * 24,
      path: '/',
      secure: false, // localhost(http)
    });

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/products'],
};
