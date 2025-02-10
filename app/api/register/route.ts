import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  // Validate incoming data
  const { name, email, password } = await req.json()
  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 })
  }
  try {
    const { name, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      // Create user in the database
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ user })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred while registering the user: " + error.message }, { status: 500 })
  }
}
