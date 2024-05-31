import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  //console.log("body>>>>>>" + JSON.stringify(body));

  const user: User = await db.user.create({
    data: {
      email: body.email,
      password: await hashPassword(body.password),
      firstName: body.firstName,
      lastName: body.lastName,
    },
  });

  const jwt = await createJWT(user);
  const res = NextResponse.json({}, { status: 201 });
  res.cookies.set(process.env.COOKIE_NAME as string, jwt, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    path: "/",
  });
  return res;
}
