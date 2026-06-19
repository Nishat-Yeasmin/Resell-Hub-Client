"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Description, Label, Radio, RadioGroup} from "@heroui/react";
import { Card, Input, Button } from "@heroui/react";
import { ArrowLeft, CircleInfo } from "@gravity-ui/icons";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("seeker");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully");

      setFormData({
        name: "",
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
          href="/auth/signin"
          className="flex items-center gap-2 text-sm text-blue-600 mb-6"
        >
          <ArrowLeft width={16} height={16} />
          Back to Sign In
        </Link>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-default-500 mt-2">
            Sign up to continue
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
        <form
          onSubmit={handleSignup}
          className="grid grid-cols-1 gap-5"
        >
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            variant="bordered"
          />

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

          {/* Role selection */}
          {/* Role selection */}
<div className="flex flex-col gap-3">
  <Label>Select Account Type</Label>

  {[
    { value: "buyer", desc: "For purchasing products" },
    { value: "seller", desc: "Sell your products" },
    { value: "admin", desc: "System administration" },
  ].map((item) => (
    <button
      type="button"
      key={item.value}
      onClick={() => setRole(item.value)}
      className={`flex items-center justify-between w-full p-3 rounded-xl border transition
        ${
          role === item.value
            ? "border-blue-600 bg-blue-50 text-blue-600"
            : "border-gray-200 text-gray-600"
        }`}
    >
      {/* left side */}
      <div className="flex items-center gap-3">
        {/* circle */}
        <div
          className={`w-4 h-4 rounded-full border flex items-center justify-center
            ${
              role === item.value
                ? "border-blue-600"
                : "border-gray-400"
            }`}
        >
          {role === item.value && (
            <div className="w-2 h-2 rounded-full bg-blue-600" />
          )}
        </div>

        {/* text */}
        <div className="text-left">
          <p className="font-medium capitalize">
            {item.value}
          </p>
          <p className="text-xs opacity-70">{item.desc}</p>
        </div>
      </div>
    </button>
  ))}
</div>

          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={loading}
          >
            Sign Up
          </Button>
        </form>

        {/* Bottom Link */}
        <p className="text-center text-sm text-default-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-600 font-medium"
          >
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}