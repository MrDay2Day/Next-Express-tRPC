/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { trpcNextAPIClient } from "@/app/_trpc/client";
import { LoadingComp } from "@/app/loading";
import BackButton from "@/components/BackButton";

const WAIT_TIME = 3000;

export default function BookPageClient({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const useFindBook = trpcNextAPIClient.books.fetchBook.useMutation();
  const [book, setBook] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const initiate = async () => {
    const paramData = await params;
    useFindBook.mutate(+paramData.id, {
      onSuccess: (data) => {
        setTimeout(() => {
          setBook(data.book);
          setLoading(false);
        }, WAIT_TIME);
      },
      onError: () => {
        setTimeout(() => {
          setLoading(false);
        }, WAIT_TIME);
      },
    });
  };

  useEffect(() => {
    initiate();
  }, []);

  return (
    <>
      <h1>
        {"Client Component - Book Information | trpcNextAPIClient -> Component"}
      </h1>
      <p>Intentional delay for 3 seconds to simulate loading...</p>
      <br />
      {loading ? (
        <LoadingComp />
      ) : !book ? (
        <div>
          <h1>Book Not Found</h1>
          <p>The book was not found!</p>
        </div>
      ) : (
        <div>
          <h1 className="font-bold font text-lg">{book?.title}</h1>
          <p>{book?.description}</p>
        </div>
      )}
      <br />
      <BackButton />
    </>
  );
}
