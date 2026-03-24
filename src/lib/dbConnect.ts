import { Collection, Document, MongoClient, ServerApiVersion } from "mongodb";

// Environment variables
const uri: string | undefined = process.env.MONGODB_URI;
const dbName: string | undefined = process.env.DB_NAME;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to environment variables");
}

if (!dbName) {
  throw new Error("Please add DB Name to environment variables");
}

// Collections constants
export const collections = {
  USERS: "users",
  COURSES: "courses",
} as const;

// MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to get collection
export const dbConnect = async <T extends Document = Document>(
  cname: string
): Promise<Collection<T>> => {
  // Ensure client is connected (MongoClient will ignore if already connected)
  await client.connect();
  return client.db(dbName).collection<T>(cname);
};