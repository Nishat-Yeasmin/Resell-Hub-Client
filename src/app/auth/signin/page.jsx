"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, Input, Button } from "@heroui/react";
import { ArrowLeft, CircleInfo } from "@gravity-ui/icons";

export default function SigninPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signin/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signin failed");
        return;
      }

      setSuccess("Login successful");

      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <Card className="w-full max-w-md p-8">
        {/* Back Button */}
        <Link
          href="/auth/signup"
          className="flex items-center gap-2 text-sm text-blue-600 mb-6"
        >
          <ArrowLeft width={16} height={16} />
          Back to Sign Up
        </Link>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-default-500 mt-2">
            Sign in to continue
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
            <CircleInfo width={18} height={18} />
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-3 rounded-xl mb-4 text-sm">
            <CircleInfo width={18} height={18} />
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignin} className="grid grid-cols-1 gap-5">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            variant="bordered"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            variant="bordered"
          />

          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={loading}
          >
            Sign In
          </Button>
        </form>

        {/* Bottom Link */}
        <p className="text-center text-sm text-default-500 mt-6">
          Dont have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-600 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
}