import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const AdminList = () => {
  const { currentUser } = useContext(AuthContext);
  const token = currentUser.accessToken;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3002/admins", {
        headers: { "x-access-token": token },
      });
      setAdmins(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the admins:", error);
    }
  };

  const [admins, setAdmins] = useState([]);

  const deleteAdmin = async (username) => {
    if (window.confirm(`Are you sure you want to delete admin ${username}?`)) {
      try {
        await axios.delete(`http://localhost:3002/admins/${username}`, {
          headers: { "x-access-token": token },
        });
        alert(`Admin ${username} was deleted`);
        fetchAdmins(); // Refresh the list of admins
      } catch (error) {
        console.error("Failed to delete the admin:", error);
      }
    }
  };

  return (
    <div className="flex absolute flex-col items-end mr-8 min-w-[499px]">
      <ul className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Admin List</h2>
        {admins.map((admin) => (
          <li key={admin.id} className="p-4 flex justify-between items-center border-b border-gray-200">
            <div>
              <p><strong>First Name:</strong> {admin.first_name}</p>
              <p><strong>Last Name:</strong> {admin.last_name}</p>
              <p><strong>Username:</strong> {admin.username}</p>
              <p><strong>Email:</strong> {admin.email}</p>
            </div>
            <button
              onClick={() => deleteAdmin(admin.username)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-150"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
