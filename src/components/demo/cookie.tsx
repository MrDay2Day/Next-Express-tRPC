"use server";
import { booksDatabase } from "@/app/(server)/api/trpc/_trpc_functions/books/books";
import { trpcServerSide } from "@/utils/trpc/trpcServerSide";

const fetchCookies = async () => {
  try {
    const books = booksDatabase;
    console.log({ books });
    const set = await trpcServerSide.CookieManagement.setCookie.query();
    const get = await trpcServerSide.CookieManagement.getCookie.query();
    console.log({ set, get });
    return { set, get };
  } catch (error) {
    console.error("Error fetching cookies:", error);
  }
};
export default async function CookieDemo() {
  await fetchCookies(); // Call the async function

  return (
    <>
      <div className="my-5 border-2 border-red-600">
        <p>{"Server Component - Cookies | trpcServerSide -> Component"}</p>
      </div>
    </>
  );
}
