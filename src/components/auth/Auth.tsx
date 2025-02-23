"use client";

import { LoadingComp } from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { getProviders } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";

import { signIn } from "next-auth/react";
import ProfileButton from "./ProfileButton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
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
        <Button
          className="mt-4 bg-red-700 text-slate-200 font-bold w-32 hover:text-red-700 hover:bg-slate-200"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    );
  }
  return (
    <>
      {/* <Button
        onClick={() => router.push("/login")}
        className=" mt-4 group relative flex w-52 justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-gray-500"
      >
        Sign in with Credentials
      </Button> */}
      {Object.values(data).map((provider) => {
        if (provider.id == "credentials") return;
        return (
          <button
            key={provider.id}
            onClick={() => signIn(provider.id)}
            className="mt-6 relative flex w-full max-w-md justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-gray-500"
          >
            Sign in with {provider.name}
          </button>
        );
      })}
    </>
  );
}
