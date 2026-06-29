"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ReviewButton({ productId }) {
  const { data: session } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewerInfo: {
            userId: session.user.id,
            name: session.user.name,
          },
          productId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Review submitted successfully");
        setOpen(false);
        setComment("");
        setRating(5);
      } else {
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Server Error");
    }
  };

  return (
    <>
      <button
        className="btn btn-warning"
        onClick={() => setOpen(true)}
      >
        ✍ Leave Review
      </button>

      {open && (
        <dialog open className="modal">
          <div className="modal-box bg-white text-black max-w-md">

            <h3 className="font-bold text-xl mb-5">
              Write Review
            </h3>

            <label className="font-semibold">
              Rating
            </label>

            <select
              className="select select-bordered w-full mt-2"
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
            >
              <option value={5}>⭐⭐⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={1}>⭐</option>
            </select>

            <textarea
              className="textarea textarea-bordered w-full mt-5"
              rows={5}
              placeholder="Write your experience..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />

            <div className="modal-action">

              <button
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Submit
              </button>

              <button
                className="btn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

            </div>

          </div>
        </dialog>
      )}
    </>
  );
}