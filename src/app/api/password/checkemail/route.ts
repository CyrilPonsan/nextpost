import { checkEmailFormSchema } from "@/lib/validation/check-email";
import { validationErrors } from "@/utils/validate";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { passwordResetMsg } from "@/lib/mail/password-reset-message";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body.data;
  const privateKey = process.env.SECRET;

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
        { type: "email", message: "no_user" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ email: email }, privateKey!, { expiresIn: "1h" });
    const subject = "Réinitialisation du mot de passe";
    const message = passwordResetMsg(token);

    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL!,
        pass: process.env.PASSWORD!,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM!,
      to: email,
      subject: subject,
      html: message,
    });

    return NextResponse.json({ message: "email_verified" }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json(error.message, { status: 500 });
  }
}
