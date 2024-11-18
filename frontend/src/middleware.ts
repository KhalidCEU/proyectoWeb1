import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';

export function middleware(req: NextRequest) {
    const cookie  = req.cookies.get('auth_token');
    const { pathname } = req.nextUrl;

    const userRoutes = ['/user'];
    const adminRoutes = ['/admin'];

    console.log('Cookie value:', cookie?.value);

    if (userRoutes.some(route => pathname.startsWith(route)) && !cookie) {
        console.log("There's no cookie !")
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (adminRoutes.some(route => pathname.startsWith(route))) {

        if (!cookie) {
            console.log("There's no cookie !")
            return NextResponse.redirect(new URL('/login', req.url))
        }

        let userRole;

        try {
            const token = cookie.value;
            const decodedToken: any = jwtDecode(token);
            userRole = decodedToken?.role;
            console.log("DecodedToken: ", decodedToken);
            console.log("User Role: ", userRole);

        } catch (error) {
            console.log("Redirecting to login (2)")
            console.log('Failed to decode token: ', error);
            return NextResponse.redirect(new URL('/login', req.url))
        }

        if (userRole != 'admin') {
            console.log("Redirecting to unauthoriized")
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|$).*)',
    ],
};