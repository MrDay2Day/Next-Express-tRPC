import Link from "next/link";

const style: { linkStyle: React.CSSProperties } = {
  linkStyle: { margin: 5, marginLeft: 10, color: "white" },
};

export default async function NavBar() {
  return (
    <div className="p-2 bg-lime-800 flex mb-10">
      <Link href={"/"} style={style.linkStyle}>
        Home
      </Link>
      <Link href={"/place"} style={style.linkStyle}>
        Place
      </Link>
      <Link href={"/map"} style={style.linkStyle}>
        Map
      </Link>
      <Link href={"/client-page"} style={style.linkStyle}>
        Client Page
      </Link>
      <Link href={"/hook-page"} style={style.linkStyle}>
        Hook Page
      </Link>
      <Link href={"/docs"} style={style.linkStyle}>
        Docs
      </Link>
      <Link href={"/editor"} style={style.linkStyle}>
        Editor
      </Link>
    </div>
  );
}
