import { User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest){
    const authToken = request.cookies.get('auth-token')?.value;
    if(!authToken) 
        return NextResponse.json({error: 'No auth token found'}, {status: 401});

    const decodedUserData = jwt.verify(authToken, process.env.JWT_SECRET!) as User;

    return NextResponse.json(decodedUserData, {status: 200});
}