"use server";

import { booksDatabase } from "@/app/(server)/api/trpc/_trpc_functions/books/books";

// This is a Server Component for the same route it can directly access the book database.

export default async function BookPage({ params }: { params: { id: number } }) {
  const book = booksDatabase[+params.id];
  if (!book) {
    return (
      <div>
        <h1>Book Not Found</h1>
        <p>The book was not found!</p>
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-bold font text-lg">{book.title}</h1>
      <p>{book.description}</p>
    </div>
  );
}
