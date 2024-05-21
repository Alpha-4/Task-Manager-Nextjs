import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest, res: NextResponse) {
  const { email, password, firstName, lastName } = await req.json();
  const user: User = await db.user.create({
    data: {
      email: email,
      password: await hashPassword(password),
      firstName: firstName,
      lastName: lastName,
    },
  });

  const jwt = await createJWT(user);
  res.cookies.set({
    name: process.env.COOKIE_NAME as string,
    value: jwt,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
