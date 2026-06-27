"use client";

import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loadUsers = () => {
    fetch("http://localhost:5000/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatus = async (id, currentStatus) => {
    const status =
      currentStatus === "blocked"
        ? "active"
        : "blocked";

    await fetch(
      `http://localhost:5000/admin/users/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    loadUsers();
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    await fetch(
      `http://localhost:5000/admin/users/${id}`,
      {
        method: "DELETE",
      }
    );

    loadUsers();
  };

  const filteredUsers = users.filter((user) =>
    user.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className=" rounded-2xl text-center shadow p-6">

      <h1 className="text-3xl font-bold mb-2">
        Manage Users
      </h1>

      <p className="text-gray-500 mb-6">
        Admin can monitor and control platform users.
      </p>

      <input
        type="text"
        placeholder="Search users..."
        className="border border-amber-50 p-3 rounded-lg w-full mb-6"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="overflow-x-auto">

        <table className="table">

          <thead className="bg-gray-700 rounded-4xl">

            <tr>
              <th  className="px-6 py-4 text-left">Name</th>
              <th  className="px-6 py-4 text-left">Email</th>
              <th  className="px-6 py-4 text-left">Role</th>
              <th  className="px-6 py-4 text-left">Status</th>
              <th  className="px-6 py-4 text-center">Actions</th>
              
            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user._id} className="border-b hover:bg-gray-600 cursor-pointer">

                <td className="px-6 py-4">{user.name}</td>

                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4 capitalize">{user.role}</td>

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      user.status === "blocked"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {user.status || "active"}
                  </span>

                </td>

                <td className="py-4 px-6">
                  <div className="flex gap-2">
                
                <button
                    onClick={() =>
                      handleStatus(
                        user._id,
                        user.status
                      )
                    }
                    className="btn btn-danger btn-sm"
                  >
                    {user.status === "blocked"
                      ? "Unblock"
                      : "Block"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>

                  </div>
                  

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ManageUsers;