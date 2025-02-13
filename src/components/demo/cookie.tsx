"use server";

/** Express Server Functionality */
import { createCaller } from "../../../server/app/trpc/trpc";

const fetchCookies = async () => {
  try {
    /** Express Server Functionality */
    // Calling the ExpressAPI tRPC route to access the function on server component
    const appCaller = createCaller({});
    const set_res = await appCaller.CookieManagement.setCookie();
    const get_res = await appCaller.CookieManagement.getCookie();

    const user_get = await appCaller.UserManagement.getUsers();
    const user_create = await appCaller.UserManagement.createUser({
      email: "newemail@email.com",
      name: "new name",
    });

    console.log({ set_res, get_res, user_get, user_create });
    return;
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
