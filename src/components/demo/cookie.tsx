"use client";
import { trpcClient } from "@/utils/trpcClientSide";
import { useEffect } from "react";

export default function CookieDemo() {
  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const set = await trpcClient.cookies.setCookie.query();
        const get = await trpcClient.cookies.getCookie.query();
        console.log({ set, get });
      } catch (error) {
        console.error("Error fetching cookies:", error);
      }
    };

    fetchCookies(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // Return null or a JSX element
}
