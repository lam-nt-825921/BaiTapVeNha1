import { NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";

export async function middleware(request) {
    console.log("middleware");
    const { pathname } = request.nextUrl;
    if (pathname.startsWith("/login")) {
        return NextResponse.next();
    }
    if (!(await isAuthenticated())) {
        console.log("redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/"
    ]
}