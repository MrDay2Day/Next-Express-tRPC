import { trpcServerSide } from "@/utils/trpc/trpcServerSide";

const fetchCookies = async () => {
  try {
    const set = await trpcServerSide.CookieManagement.setCookie.query();
    const get = await trpcServerSide.CookieManagement.getCookie.query();
    return { set, get };
  } catch (error) {
    console.error("Error fetching cookies:", error);
  }
};
export default async function CookieDemo() {
  const cookies = await fetchCookies(); // Call the async function
  console.log(cookies);

  return (
    <>
      <p>Server Side Component</p>
    </>
  ); // Return null or a JSX element
}
