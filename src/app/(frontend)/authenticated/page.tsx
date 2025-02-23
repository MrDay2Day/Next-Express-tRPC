import authOptions from "@/app/api/auth/NextAuthOptions";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  console.log({ session });

  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <>
        <h3>Server Side Rendered Page</h3>
        <p>Welcome, {session.user?.name}!</p>
      </>
    </div>
  );
}
