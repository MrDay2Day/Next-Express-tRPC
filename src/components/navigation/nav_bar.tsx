import Link from "next/link";

export default async function NavBar() {
  return (
    <div className="p-2 bg-lime-800 flex mb-10">
      <Link href={"/"} className="m-2">
        Home
      </Link>
      <Link href={"/place"} className="m-2">
        Place
      </Link>
      <Link href={"/map"} className="m-2">
        Map
      </Link>
      <Link href={"/client-page"} className="m-2">
        Client Page
      </Link>
      <Link href={"/hook-page"} className="m-2">
        Hook Page
      </Link>
      <Link href={"/docs"} className="m-2">
        Docs
      </Link>
      <Link href={"/editor"} className="m-2">
        Editor
      </Link>
    </div>
  );
}
