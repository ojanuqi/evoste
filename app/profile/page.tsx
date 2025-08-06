"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter(); // untuk redirect setelah logout

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("evoste-user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        email: parsedUser.email || "",
        phoneNumber: parsedUser.phoneNumber || "",
        dateOfBirth: parsedUser.dateOfBirth || "",
      });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("evoste-user", JSON.stringify(user));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("evoste-user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5EF]">
      <div className="bg-white p-8 md:p-12 shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
        <form className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={user.firstName}
              disabled
              className="w-full border border-gray-300 p-3 bg-gray-100"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={user.lastName}
              disabled
              className="w-full border border-gray-300 p-3 bg-gray-100"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={user.dateOfBirth}
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
              disabled={!isEditing}
              className="w-full border border-gray-300 p-3"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              disabled={!isEditing}
              className="w-full border border-gray-300 p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border border-gray-300 p-3 bg-gray-100"
            />
          </div>

          {/* Tombol Simpan / Edit */}
          <div className="flex justify-end">
            {isEditing ? (
              <button
                type="button"
                className="bg-[#C9B37E] text-white px-6 py-2"
                onClick={handleSave}
              >
                Simpan
              </button>
            ) : (
              <button
                type="button"
                className="bg-[#C9B37E] text-white px-6 py-2"
                onClick={() => setIsEditing(true)}
              >
                Edit Data
              </button>
            )}
          </div>
        </form>

        {/* Tombol Logout */}
        <div className="mt-8 text-right">
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 underline hover:text-red-800 transition"
          >
            Keluar Akun
          </button>
        </div>
      </div>
    </div>
  );
}
