import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    if (!req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    url.pathname = "/login";

    const cookie = req.cookies.toString();
    
    // Validate the token by sending the cookies to the backend
    const response = await fetch("http://127.0.0.1:8000/users/validate-token", {
        method: "POST",
        credentials: "include", // Ensures the fetch includes cookies
        headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
        }, 
    });

    const data = await response.json();


    if (data.status === "error") {
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    
};
