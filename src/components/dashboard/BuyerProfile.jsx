"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BuyerProfile = () => {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
  if (!session?.user) return;

  setName(session.user.name ?? "");
  setImage(session.user.image ?? "");
}, [session]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(
      `http://localhost:5000/buyer/profile/${session.user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          image,
        }),
      }
    );

    if (res.ok) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile.");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-center">
        Profile Management
      </h1>

      <p className="text-gray-400 text-center mt-2 mb-8">
        Buyers can manage their personal information.
      </p>

      <div className="flex justify-center mb-8">

        <img
          src={
            image ||
            "https://i.ibb.co/4pDNDk1/avatar.png"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
        />

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label className="font-semibold">
            Full Name
          </label>

          <input
            type="text"
            className="input input-bordered w-full mt-2"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>

        <div>

          <label className="font-semibold">
            Profile Image URL
          </label>

          <input
            type="text"
            className="input input-bordered w-full mt-2"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

        </div>

        <button
          className="btn btn-primary w-full"
        >
          Update Profile
        </button>

      </form>

    </div>
  );
};

export default BuyerProfile;