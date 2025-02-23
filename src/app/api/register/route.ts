// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCount, users } from "@/lib/nextAuth/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body as {
      email: string;
      name: string;
      password: string;
    };

    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // Check if user exists
    const existingUser = users.find((x) => x.email == email);

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    users.push({
      id: crypto.randomUUID(),
      email,
      name,
      hashedPassword,
    });

    return NextResponse.json({ name, email });
  } catch (error) {
    console.log("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
