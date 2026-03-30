import ProfileSettings from "@/components/dashboard/ProfileSettings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/dbConnect";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const userCollection = await dbConnect(collections.USERS);
  
  // Database theke fresh data niye asha
  const user = await userCollection.findOne({ email: session?.user?.email });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Account Settings</h1>
      {/* MongoDB theke pawa plain object pass korun */}
      <ProfileSettings user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
}