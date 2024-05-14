import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcyrptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User Not Found"},{status:400})
        }
        console.log(user)

        const isPasswordCorrect = await bcyrptjs.compare(password,user.password)
        if(!isPasswordCorrect){
            return NextResponse.json({error:"Incorrect Password"},{status:400})
        }

        const tokendata = {
            id:user._id,
            username:user.username,
            email:user.email

        }

        const token = jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response = NextResponse.json({
            message:'Logged In Successfully',
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response



    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}