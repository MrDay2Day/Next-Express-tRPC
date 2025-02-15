import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "404 - Not Found",
  description: "The request endpoint does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex w-full h-full justify-center items-center flex-col p-10 pt-16">
      <h1 className="text-center text-7xl">404</h1>
      <h2 className="text-center">Resource Not Found</h2>
      <p className="text-center">Could not find requested resource</p>
      <br />
      <Link className="max-w-40 mx-auto" href="/">
        <Button className="font-bold">Return Home</Button>
      </Link>
    </div>
  );
}
