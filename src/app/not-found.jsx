import Link from "next/link";
import { TriangleExclamation } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-6">
      <div className="text-center max-w-lg">
        {/* Illustration */}

        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-8 rounded-full">
            <TriangleExclamation
              width={80}
              height={80}
              className="text-red-500"
            />
          </div>
        </div>

        {/* 404 Text */}

        <h1 className="text-7xl font-bold text-gray-200">
          404
        </h1>

        <h2 className="text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-300 mt-3">
          Sorry, the page you are looking for does not exist
          or has been moved.
        </p>

        {/* Button */}

        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
}