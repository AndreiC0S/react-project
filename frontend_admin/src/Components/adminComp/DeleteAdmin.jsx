import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../context/authContext";

export default function DeleteAdmin() {
  const { currentUser } = useContext(AuthContext);
  const token = currentUser.accessToken;

  const [formData, setFormData] = useState({
    username: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenirea reîncărcării paginii
    try {
      await axios.delete(`http://localhost:3002/admins/${formData.username}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
        alert(`User ${formData.username} was deleted`);
        setFormData({ username: "" }); // Resetează formularul
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-lg font-semibold text-gray-700 text-center">Delete Admin</h1>
        <Formik initialValues={formData} onSubmit={handleSubmit}>
          <Form className="space-y-4 mt-4">
            <Field
              name="username"
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Delete Admin
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
