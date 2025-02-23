"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileButton() {
  const { data: session } = useSession();
  console.log({ userSession: session });

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Avatar>
        <AvatarImage src={session.user.image || ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="mt-4">{`${session.user?.name}'s Profile`}</p>
    </div>
  );
}
