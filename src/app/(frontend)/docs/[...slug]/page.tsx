import "server-only";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "./utils/BackButton";
import { trpc } from "@/utils/trpc";

// For static params
interface Props {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

// Generate static params
// export async function generateStaticParams() {
//   const posts = await fetchPosts(); // Your fetch function

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// Generate metadata using static params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = {
    title: decodeURI(resolvedParams.slug[0]),
    description: decodeURI(resolvedParams.slug[0]),
  };

  const users = await trpc.getUsers.query();
  console.dir({ users }, { depth: "*" });

  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      // images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      // images: [post.image],
    },
  };
}

export default async function Searched({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}) {
  const resolvedParams = await params;
  // const router = useRouter();

  return (
    <>
      <div>
        <h1>Docs</h1>
        {resolvedParams.slug.length == 1 ? (
          <>
            <h2>{decodeURI(resolvedParams.slug[0])}</h2>
          </>
        ) : resolvedParams.slug.length == 2 ? (
          <>
            <h2>{decodeURI(resolvedParams.slug[0])}</h2>
            <h3>{decodeURI(resolvedParams.slug[1])}</h3>
          </>
        ) : (
          <>
            <p>No Search Param</p>
          </>
        )}
        <BackButton />

        {resolvedParams.slug.length == 1 ? <p>Information goes here</p> : null}
      </div>
    </>
  );
}
