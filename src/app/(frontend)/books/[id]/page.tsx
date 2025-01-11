/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { trpcNextAPIClient } from "@/app/_trpc/client";
import { LoadingComp } from "@/app/loading";

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

  if (loading) {
    return <LoadingComp />;
  } else if (!book) {
    return (
      <div>
        <h1>Book Not Found</h1>
        <p>The book was not found!</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="font-bold font text-lg">{book?.title}</h1>
        <p>{book?.description}</p>
      </div>
    );
  }
}
