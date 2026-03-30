import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { name, image, cover, bio, phone } = await req.json();

    const userCollection = await dbConnect(collections.USERS);

    await userCollection.updateOne(
      { email: session.user.email },
      {
        $set: {
          name,
          image, 
          cover, 
          bio,   
          phone, 
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const userCollection = await dbConnect(collections.USERS);

    const users = await userCollection.find().toArray();

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}