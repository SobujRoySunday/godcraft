import { User } from "@/lib/types";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const authToken = request.cookies.get('auth-token')?.value;
    if(!authToken) 
        return NextResponse.json({error: 'No auth token found'}, {status: 401});

    const decodedUserData = jwtDecode(authToken) as User;

    return NextResponse.json(decodedUserData, {status: 200});
}