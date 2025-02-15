"use server";

import { createCaller_next } from "@/app/(server)/api/trpc/_trpc_functions/main";
import { Book } from "@/app/(server)/api/trpc/_trpc_functions/books/_data";
import BackButton from "@/components/BackButton";
import { Metadata } from "next";

// This is a Server Component for the same route it can directly access the book database.

type ErrorType = {
  environmentName: string;
  message: string;
};

type Props = {
  params: Promise<{
    id: number;
  }>;
};

type FetchBookType =
  | {
      error: null;
      book: Book;
      date: Date;
    }
  | {
      error: ErrorType;
      book: null;
    };

// Generate metadata using static params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  let data: FetchBookType;
  try {
    data = await fetchBook(+resolvedParams.id);
  } catch (error: FetchBookType | unknown) {
    data = error as FetchBookType;
  }

  if (data.error) {
    return {
      title: data.error.message,
      description: data.error.message,
      openGraph: {
        title: data.error.message,
        description: data.error.message,
        // images: [post.image],
      },
      twitter: {
        card: "summary_large_image",
        title: data.error.message,
        description: data.error.message,
        // images: [post.image],
      },
    };
  }

  return {
    title: data.book.title,
    description: data.book.description,
    openGraph: {
      title: data.book.title,
      description: data.book.description,
      // images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: data.book.title,
      description: data.book.description,
      // images: [post.image],
    },
  };
}

async function fetchBook(id: number) {
  try {
    // Calling the NextAPI tRPC route to access the function on server component that is secured
    const appCaller_next = createCaller_next({
      req: null,
      res: null,
      authHeader: "Bearer USER.JWT.ACCESS",
    });
    const result = await appCaller_next.books.fetchBook(+id);
    console.log({ result });
    return { ...result, error: null };
  } catch (error: ErrorType | unknown) {
    console.log({ error });
    return { error: error as ErrorType, book: null };
  }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const resolvedParams = await params;
  const result = await fetchBook(+resolvedParams.id);
  if (result.error) {
    return (
      <div>
        <h1>Book Fetch Error</h1>
        <p>{result.error.message}</p>
        <br />
        <BackButton />
      </div>
    );
  } else if (!result.book) {
    return (
      <div>
        <h1>Book Not Found</h1>
        <p>The book was not found!</p>
        <br />
        <BackButton />
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-bold font text-lg">{result.book.title}</h1>
      <p>{result.book.description}</p>
      <br />
      <BackButton />
    </div>
  );
}
