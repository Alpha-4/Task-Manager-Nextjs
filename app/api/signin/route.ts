import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });
  const isUser = await comparePasswords(body.password, user?.password!);

  if (isUser) {
    const jwt = await createJWT(user as User);

    const res = NextResponse.json({}, { status: 200 });

    res.cookies.set(process.env.COOKIE_NAME as string, jwt, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  return NextResponse.json({}, { status: 401 });
}
