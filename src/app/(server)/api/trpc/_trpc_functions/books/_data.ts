export type Book = {
  title: string;
  description: string;
};

// Simulate a database of books
export const booksDatabase: Book[] = [
  {
    title: "The Great Gatsby",
    description: "A novel by F. Scott Fitzgerald set in the Jazz Age.",
  },
  {
    title: "To Kill a Mockingbird",
    description:
      "A novel by Harper Lee about racial injustice in the Deep South.",
  },
  {
    title: "1984",
    description:
      "A dystopian novel by George Orwell about a totalitarian regime.",
  },
  {
    title: "Pride and Prejudice",
    description: "A romantic novel by Jane Austen set in 19th-century England.",
  },
  {
    title: "Moby Dick",
    description:
      "A novel by Herman Melville about the obsessive quest for a white whale.",
  },
  {
    title: "The Catcher in the Rye",
    description: "A novel by J.D. Salinger about teenage rebellion and angst.",
  },
  {
    title: "The Lord of the Rings",
    description:
      "A fantasy epic by J.R.R. Tolkien about the fight against Sauron.",
  },
  {
    title: "The Hobbit",
    description: "A fantasy adventure by J.R.R. Tolkien about Bilbo Baggins.",
  },
  {
    title: "Brave New World",
    description:
      "A dystopian novel by Aldous Huxley about a technologically advanced society.",
  },
  {
    title: "The Alchemist",
    description:
      "A novel by Paulo Coelho about a shepherd's journey to find his treasure.",
  },
];
