import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const onlyNoAuthPaths = ['/login'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token')?.value;

  // Define paths that must not have authentication
  const isOnlyNoAuthPath = onlyNoAuthPaths.some(path => request.nextUrl.pathname.startsWith(path));
  if (isOnlyNoAuthPath && authToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/store';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
