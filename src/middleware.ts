import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPaths = ['/', '/login', '/signup'];
    const isPublic = isPublicPaths.includes(path);
    
    const token = request.cookies.get('token')?.value || '';

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/dashboard', '/login', '/signup'],
}