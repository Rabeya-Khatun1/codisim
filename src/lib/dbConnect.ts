import { Collection, Document, MongoClient, ServerApiVersion } from "mongodb";
const uri: string | undefined =process.env.MONGODB_URI
const dbName: string | undefined= process.env.DB_NAME

if (!uri) {
  throw new Error("Please add your MONGODB_URI to environment variables");
}
if(!dbName){
    throw new Error("Please add DB Name to environment variables")
}

export const collections = {
    USERS: "users",

} as const;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbConnect = async<T extends Document=Document>(cname:string) : Collection<T>=> {
    return client.db(dbName).collection<T>(cname)
}