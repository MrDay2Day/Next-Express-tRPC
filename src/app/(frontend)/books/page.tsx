"use server";
import { booksDatabase } from "@/app/(server)/api/trpc/_trpc_functions/books/books";
import Link from "next/link";
import React from "react";

const Books: React.FC = async () => {
  const books = booksDatabase;
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
