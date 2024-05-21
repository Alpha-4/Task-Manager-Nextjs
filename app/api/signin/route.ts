import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";

export default async function POST(req: NextRequest, res: NextResponse) {
  const { email, password, firstName, lastName } = await req.json();
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }

  const isUser = await comparePasswords(password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);
    res.cookies.set({
      name: process.env.COOKIE_NAME as string,
      value: jwt,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(null, { status: 201 });
  } else {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }
}
