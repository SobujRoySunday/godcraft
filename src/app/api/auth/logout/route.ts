import { NextResponse } from "next/server";

export async function GET(){
    // Delete auth token cookie
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
    response.cookies.delete('auth-token');
    return response
}