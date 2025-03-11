// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import { getCount, users } from "@/lib/nextAuth/users";
import { usersTable } from "../../../../database/schemas/Users";
import { pg_db } from "../../../../database/index";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, referralCode } = body as {
      email: string;
      name: string;
      password: string;
      referralCode?: string;
    };

    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // Check if user exists
    const existingUser = await pg_db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length > 0) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser: typeof usersTable.$inferInsert = {
      email: email,
      name: name,
      password: hashedPassword,
    };

    if (referralCode) {
      newUser.referralCode = String(referralCode);
    }

    const inserted = await pg_db.insert(usersTable).values(newUser).returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    });

    return NextResponse.json({
      id: inserted[0]["id"],
      name: inserted[0]["name"],
      email: inserted[0]["email"],
    });
  } catch (error) {
    console.log("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
