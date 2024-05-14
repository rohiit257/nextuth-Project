import { connectDb } from "@/db/db";
import { NextResponse, NextRequest } from "next/server";

connectDb()
export async function POST(request:NextRequest){
    //login m cookies access krke token ko null krdena hota h aur uska expiry bhi expire kradena hota h

    try {
        const response = NextResponse.json({
            message:"Logged out successfully",
            success:true
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires:Date.now()
        })
        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }

}

