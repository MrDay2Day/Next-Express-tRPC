import z from "zod";
import { publicProcedure, router } from "../../config";
import { TRPCError } from "@trpc/server";
import { pg_db } from "../../../../../database";
import { usersTable } from "../../../../../database/schemas/Users";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

// Define types for our user data
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

let count = 1;
// Mock database
const users: User[] = [
  { id: count++, name: "Alice", email: "alice@example.com" },
  { id: count++, name: "Bob", email: "bob@example.com" },
];

const UserManagement = router({
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email().nonempty("Email is required!"),
        password: z.string().min(8).nonempty("Password is required!"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const requestDate = new Date();
      const users = await pg_db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, input.email));

      if (
        !users ||
        users.length <= 0 ||
        users.length > 1 ||
        !users[0].password
      ) {
        throw new Error("Invalid credentials");
      }

      const user = users[0];

      const isCorrectPassword = await bcrypt.compare(
        input.password,
        user["password"]
      );

      if (!isCorrectPassword) {
        throw new Error("Invalid credentials");
      }

      return {
        id: String(user.id),
        email: user.email,
        name: user.name,
        requestDate,
        completeDate: new Date(),
      };
    }),
  // Route 1: Get all users
  getUsers: publicProcedure.query(async () => {
    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return users;
  }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const newUser: User = {
        id: count++,
        name: input.name,
        email: input.email,
      };

      users.push(newUser);
      return newUser;
    }),

  deleteUser: publicProcedure
    .input(z.object({ name: z.string().min(3, "3 or more characters") }))
    .mutation(async ({ input }) => {
      let found = false;
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user && user.name == input.name) {
          found = true;
          users.splice(i, 1);
          return "Deleted user " + input.name;
        }
      }

      if (!found) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User's name not found.",
        });
      }
    }),
});

export default UserManagement;
