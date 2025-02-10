"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import AuthBox from '../../components/ui/AuthBox';
import { Button } from '../../components/ui/button'; // Corrected import for Button

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
      if (res.ok) {
        signIn("credentials", { email, password, callbackUrl: "/" })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthBox>
      <h1 className="text-6xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none"
          required
        />
        <div className="flex flex-col items-center">
          <Button type="submit" className="w-full px-4 py-2 mb-4 text-white bg-blue-600 rounded-lg focus:outline-none hover:bg-blue-700 transition duration-200">
            Sign Up
          </Button>
          <Button onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full max-w-md px-4 py-2 mb-4 text-white bg-red-600 rounded-lg focus:outline-none hover:bg-red-700 transition duration-200">
            Sign Up with Google
          </Button>
        </div>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-white hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthBox>
  )
}