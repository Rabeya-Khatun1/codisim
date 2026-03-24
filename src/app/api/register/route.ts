"use server";

import { NextResponse } from "next/server";
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export interface IUser {
  _id?: string;          // MongoDB ObjectId as string
  name: string;
  email: string;
  password: string;
  status: string;
  createdAt: string;
  role: string;
}

interface IServerResponse {
  success: boolean;
  message: string;
  insertedId?: string;
}

// 🔹 Create/Register user
export const postUser = async (payload: IUser): Promise<IServerResponse> => {
  const userCollections = await dbConnect<IUser>(collections.USERS);

  // Check if user exists
  const isExistUser = await userCollections.findOne({ email: payload.email });
  if (isExistUser) {
    return { success: false, message: "User already exists" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 14);

  const newUser: IUser = {
    ...payload,
    status: "pending",
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  const result = await userCollections.insertOne(newUser);

  if (result.acknowledged) {
    return {
      success: true,
      message: "Successfully registered",
      insertedId: result.insertedId.toString(),
    };
  }

  return { success: false, message: "Something went wrong" };
};

// 🔹 Get all users
export const getUsers = async (): Promise<IUser[]> => {
  const userCollections = await dbConnect<IUser>(collections.USERS);
  const users = await userCollections.find({}).toArray();

  return users.map(user => ({
    ...user,
    _id: user._id?.toString(),
  }));
};

// 🔹 Update user
export const updateUser = async (
  email: string,
  payload: Partial<IUser>
): Promise<IServerResponse> => {
  if (!email) return { success: false, message: "Email is required" };

  const userCollections = await dbConnect<IUser>(collections.USERS);

  const updateData: Partial<IUser> = { ...payload };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 14);
  }

  const result = await userCollections.updateOne(
    { email },
    { $set: updateData }
  );

  if (result.modifiedCount > 0) {
    return { success: true, message: "Profile updated successfully" };
  }

  return { success: false, message: "No changes were made" };
};

// 🔹 API Route handlers
export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const payload: IUser = await req.json();
  const result = await postUser(payload);
  return NextResponse.json(result);
}

export async function PUT(req: Request) {
  const { email, payload }: { email: string; payload: Partial<IUser> } =
    await req.json();
  const result = await updateUser(email, payload);
  return NextResponse.json(result);
}