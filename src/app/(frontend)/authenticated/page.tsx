import { authOptions } from "@/lib/appOptions";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  console.log({ session });

  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  return <div>Welcome, {session.user?.email}!</div>;
}
