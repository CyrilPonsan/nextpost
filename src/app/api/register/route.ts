import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { loginFormSchema } from "@/lib/validation/login-form";
import { validationErrors } from "@/utils/validate";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body.data;
  console.log("hello endpoint");

  try {
    loginFormSchema.parse(body.data);
  } catch (error: any) {
    return NextResponse.json(validationErrors(error), { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: { email },
  });

  if (exist) {
    return NextResponse.json(
      { type: "email", message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
