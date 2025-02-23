"use client";

import { LoadingComp } from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { getProviders } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";

import { signIn } from "next-auth/react";
import ProfileButton from "./ProfileButton";
import { Button } from "../ui/button";

export default function Auth() {
  const { data, isLoading } = useQuery(["providers"], async () => {
    const providerData = await getProviders();
    return providerData;
  });
  const { data: sessionData } = useSession();

  console.log({ data });
  if (isLoading) {
    return <LoadingComp />;
  }
  if (!data) {
    return <p>Something went wrong!</p>;
  }

  if (sessionData?.user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <ProfileButton />
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      {Object.values(data).map((provider) => (
        <Button
          key={provider.id}
          onClick={() => signIn(provider.id)}
          className="mx-auto"
        >
          Sign in with {provider.name}
        </Button>
      ))}
    </div>
  );
}
