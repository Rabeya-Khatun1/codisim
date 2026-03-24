import { collections, dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

export const getSingleCourse = async (id:string)=>{
 
    const query = {_id:new ObjectId(id)}
const coursesCollections = await dbConnect(collections.COURSES)
const result = await coursesCollections.findOne(query)
return result || null

}