// src/app/login/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";
import RegisterModal from "@/components/auth/RehistrationModal";
import { LoadingComp } from "@/app/loading";

/*

// Server component
const session = await getServerSession(authOptions);
console.log(session?.accessToken);

// Client component
const { data: session } = useSession();
console.log(session?.accessToken);

 */

export default function LoginPage() {
  const { data: sessionData, status } = useSession();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      setError(null);

      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setError(null);

  //     const formData = new FormData(e.currentTarget);
  //     const email = formData.get("email") as string;
  //     const password = formData.get("password") as string;

  //     try {
  //       const result = await signIn("credentials", {
  //         email,
  //         password,
  //         redirect: false,
  //       });

  //       if (result?.error) {
  //         setError("Invalid credentials");
  //         return;
  //       }

  //       router.push("/");
  //       router.refresh();
  //     } catch (error) {
  //       setError("Something went wrong");
  //     }
  //   };

  if (status == "loading") {
    return <LoadingComp />;
  }

  return (
    <div className="flex flex-col items-center mb-10 relative rounded-lg">
      {loading && (
        <div className="absolute w-full h-full bg-slate-800 bg-opacity-80 z-10 opacity-90 rounded-lg flex justify-center items-center">
          <h1 className="text-slate-50">Loading...</h1>
        </div>
      )}
      {sessionData?.user ? null : (
        <>
          <div className="w-full max-w-md space-y-8">
            <RegisterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div>
              <h2 className="text-center text-3xl font-bold">
                Sign in to your account
              </h2>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4 rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="relative block w-full rounded-md p-2 text-center border-[1px] border-slate-500"
                    placeholder="Email address"
                    onChange={() => setError("")}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="relative block w-full rounded-md p-2 text-center border-[1px] border-slate-500"
                    placeholder="Password"
                    onChange={() => setError("")}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full border-[1px] border-slate-500 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-gray-800 hover:bg-gray-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="relative mt-2 mb-6 flex w-full max-w-md border-[1px] border-slate-500 justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white bg-gray-800 hover:bg-gray-500"
          >
            Register
          </button>
        </>
      )}
      <Auth />
    </div>
  );
}
