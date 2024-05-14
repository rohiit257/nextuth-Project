import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connectDb } from "@/db/db";


connectDb()
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json({
        message:"User Found",
        data:user
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
