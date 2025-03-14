"use server";
import Link from "next/link";
import React from "react";
import { getTRPCCaller } from "@/app/_trpc/server";

const Books: React.FC = async () => {
  // Calling the NextAPI tRPC route to access the function on server component
  const appCaller_next = getTRPCCaller();

  const books = await appCaller_next.books.fetchAll({ count: 10 });

  console.log({ books });

  return (
    <div>
      <h1>Books Page</h1>
      <p>Welcome to the books page!</p>
      <p>This route uses dynamic sitemap.xml based on the data requested.</p>
      <br />
      {books.map((book, index) => (
        <div className="m-5" key={index}>
          <Link href={`/books/${index}`}>{book.title}</Link>
          {" - "}
          <Link href={`/books/sitemap/${index}.xml`}>sitemap</Link>
        </div>
      ))}
    </div>
  );
};

export default Books;
