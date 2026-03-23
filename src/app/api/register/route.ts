"use server"
import { collections, dbConnect } from "@/lib/dbConnect"
import bcrypt from "bcryptjs";

export interface IUser {
    id: string,
    name:string, 
    email: string,
    password:string,
    status:string,
    createdAt:string,
    role:string
}

 interface IServerResponse {
success:boolean,
message:string,
insertedId?:string,
}

export const postUser = async(payload:IUser):Promise<IServerResponse>=>{
    const userCollections= await dbConnect<IUser>(collections.USERS);

   const isExistUsers = await userCollections.findOne({email: payload.email})
   if(isExistUsers){
    return {
        success:false,
        message:"User already existed"
    }
   }

   const hashedPassword = await bcrypt.hash(payload.password,14)
const newUser:IUser = {...payload,status:"pending", password:hashedPassword, createdAt:new Date().toISOString()}
const result = await userCollections.insertOne(newUser);
if(result.acknowledged){
    return{
        success:true,
        message: "successfully registered",
        insertedId: result.insertedId.toString()
    }
}

return {
    success:false,
    message:"something went wrong"
}
}


export const getUsers = async (): Promise<IUser[]> => {
    try {
        const userCollections = await dbConnect<IUser>(collections.USERS);
        const users = await userCollections.find({}).toArray();

        return users.map(user => ({
            ...user,
            _id: user._id?.toString() 
        })) as IUser[];
        
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}


// export const updateUser = async (
//   email: string,
//   payload: Partial<IUser>
// ): Promise<IServerResponse> => {
//   try {
//     if (!email) {
//       return { success: false, message: "Email is required to update profile" };
//     }

//     const userCollection = await dbConnect<IUser>(collections.USERS);

//     const updateData: Partial<IUser> = { ...payload };
//     if (updateData.password) {
//       updateData.password = await bcrypt.hash(updateData.password, 14);
//     }

//     const result = await userCollection.updateOne(
//       { email: email },
//       { $set: updateData }
//     );

//     if (result.modifiedCount > 0) {
//       return {
//         success: true,
//         message: "প্রোফাইল সফলভাবে আপডেট করা হয়েছে!",
//       };
//     }

//     return {
//       success: false,
//       message: "কোনো পরিবর্তন করা হয়নি।",
//     };
//   } catch (error: any) {
//     console.error("Update Error:", error);
//     return {
//       success: false,
//       message: error.message || "Internal Server Error",
//     };
//   }
// };
// 🔹 Key TypeScript Improvements
// IUser interface → type-safe payload