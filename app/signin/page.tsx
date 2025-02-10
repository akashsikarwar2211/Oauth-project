"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import AuthBox from '../../components/ui/AuthBox';
import { Button } from '../../components/ui/button'; // Importing button component

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn("credentials", { email, password, callbackUrl: "/" })
  }

  return (
    <AuthBox>
      <h5 className="text-6xl font-bold mb-6 text-center">Sign In</h5>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <div className="flex flex-col items-center">
          <Button type="submit" className="w-full px-4 py-2 mb-4 text-white bg-blue-600 rounded-lg focus:outline-none hover:bg-blue-700 transition duration-200">
            Sign In
          </Button>
          <Button onClick={async () => {
            await signIn("google", { callbackUrl: "/" });
          }} className="w-full max-w-md px-4 py-2 mb-4 text-white bg-red-600 rounded-lg focus:outline-none hover:bg-red-700 transition duration-200">
            Sign In with Google
          </Button>
        </div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthBox>
  )
}
