"use client";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Image from "next/image";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Not logged in</p>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

            {/* User Info Card */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center">
                <Image
                  className="h-20 w-20 rounded-full"
                  src={user?.image || "/Logo.jpeg"}
                  alt="Profile"
                  width={80}
                  height={80}
                />
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Welcome, {user?.name || "User"}!
                  </h2>
                  <p className="text-gray-600">
                    Email: {user?.email || "No email provided"}
                  </p>
                  <p className="text-gray-600">
                    User ID: {user?.id || "No ID available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Session Information */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Session Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-sm text-gray-900">Authenticated</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider</p>
                  <p className="text-sm text-gray-900">Google</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/CraftTourPage"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Craft A Tour
                </a>
                <a
                  href="/LinkTourCraftPage"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Link TourCraft
                </a>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Tours
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
