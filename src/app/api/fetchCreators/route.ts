import connectDB from "@/lib/db";
import Creator from "@/models/creator.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const creators = await Creator.find();
        
        if (!creators) {
            return NextResponse.json("No creators found", { status: 404 });
        }
        
        return NextResponse.json(creators, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Failed to fetch creators", { status: 500 });
    }
}
