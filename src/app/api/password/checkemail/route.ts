import { checkEmailFormSchema } from "@/lib/validation/check-email";
import { validationErrors } from "@/utils/validate";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body.data;

  try {
    checkEmailFormSchema.parse(body.data);
  } catch (error: any) {
    return NextResponse.json(validationErrors(error), { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  try {
    if (!existingUser) {
      return NextResponse.json(
        { type: "email", message: "User already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Email verified" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
