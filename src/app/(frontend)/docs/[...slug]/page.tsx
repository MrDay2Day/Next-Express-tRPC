import "server-only";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "../../../../components/BackButton";
import InputSection from "./utils/InputSection";

// For static params
type SearchQueryType = { string: string; boolean: boolean; number: number };
type Props = {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<
    { [key: string]: string | string[] | undefined } | SearchQueryType
  >;
};

// Generate static params
// export async function generateStaticParams() {
//   const posts = await fetchPosts(); // Your fetch function

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// Generate metadata using static params
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedQueries = await searchParams;

  const { string, boolean, number } = resolvedQueries as SearchQueryType;
  console.log(
    { resolvedQueries },
    { string, boolean: boolean && JSON.parse(String(boolean)), number: +number }
  );

  // Do some fetch functionality using 'resolvedParams' & 'resolvedQueries';

  const post = {
    title: decodeURI(resolvedParams.slug[0]),
    description: decodeURI(resolvedParams.slug[0]),
  };

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

export default async function Searched({ params }: Props) {
  const resolvedParams = await params; // Do some fetch functionality using 'resolvedParams';

  return (
    <>
      <div>
        <h1>Docs</h1>
        <InputSection />
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
