import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Professional Loader */}
      <div className="flex flex-col items-center justify-center py-16">
        <Spinner size="lg" />
        <h2 className="mt-4 text-xl font-semibold">
          Loading ReSell Hub...
        </h2>
        <p className="text-gray-500">
          Please wait while we prepare your content
        </p>
      </div>

      {/* Skeleton Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 animate-pulse"
          >
            <div className="h-48 bg-gray-300 rounded-lg"></div>

            <div className="mt-4 h-5 bg-gray-300 rounded"></div>

            <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>

            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>

            <div className="mt-4 h-10 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}