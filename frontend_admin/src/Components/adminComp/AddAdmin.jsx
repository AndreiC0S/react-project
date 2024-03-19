import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    first_name:"",
    last_name:"",
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Adaugat pentru confirmare parola
    master: "0",
  });

  const [isPasswordHintVisible, setPasswordHintVisible] = useState(false);
  const [conditions, setConditions] = useState({
    minLength: false,
    upperCase: false,
    specialChar: false,
    containsNumber: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      const minLength = value.length >= 8;
      const upperCase = /[A-Z]/.test(value);
      const specialChar = /[-!@#$%^&*_]/.test(value);
      const containsNumber = /\d/.test(value);
      setConditions({ minLength, upperCase, specialChar, containsNumber });
    }
    setFormData({ ...formData, [name]: value });
  };

  const clearInput = () => {
    setFormData({
      first_name:"",
      last_name:"",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      master: "0",
    });
  };

  const handleInputFocus = () => {
    setPasswordHintVisible(true);
  };

  const handleInputBlur = () => {
    setPasswordHintVisible(false);
  };

  const handleSubmit = async (e) => {
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post(`http://localhost:3002/admins/`, formData);
      alert("Admin account created");
      clearInput();
    } catch (err) {
      console.log(err);
      alert("An error occurred");
    }
  };

  const passwordMatchClass = formData.password && formData.confirmPassword
    ? formData.password === formData.confirmPassword
      ? "border-green-500" // Parolele se potrivesc
      : "border-red-500" // Parolele nu se potrivesc
    : "border-gray-300"; // Starea inițială pentru câmpuri

  return (
    <div className="flex absolute top-20 left-10 flex-col bg-white shadow-lg border border-gray-200 rounded-lg p-8">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">Add Admin</h1>
      <Formik initialValues={formData} onSubmit={handleSubmit} enableReinitialize>
        <Form className="space-y-4">
        <div>
            <Field
              name="first_name"
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            
            <Field
              name="last_name"
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            
            <Field
              name="username"
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Field
              type="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
             {isPasswordHintVisible && (
            <div className=" text-xs mb-[10px]">
              <ol className="flex flex-col items-start">
                {!conditions.minLength && <li>- at least 8 characters</li>}
                {!conditions.upperCase && <li>- one upper character</li>}
                {!conditions.specialChar && <li>- one special character !@#$%^&*</li>}
                {!conditions.containsNumber && <li>- at least one number (0-9)</li>}
              </ol>
            </div>
          )}
          </div>
          <div>
          <Field
            name="confirmPassword"
            type="password"
            onChange={handleInputChange}
            placeholder="Confirm Password"
            
            className={`w-full p-2 rounded-md border-2 ${passwordMatchClass} `}
          />
        </div>
       
          <div className="flex items-center justify-start">
            <label htmlFor="master" className="mr-2">Master Admin?</label>
            <Field
              as="select"
              name="master"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </Field>
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-2 border border-gray-300 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
    // <div className="flex absolute top-[10.6vh] left-[10px] flex-col border-2 border-black mt-[-2px] p-[10px] items-center bg-gray-500">
    //   <h1>Add Admin</h1>
    //   <Formik initialValues={formData} onSubmit={handleSubmit} enableReinitialize>
    //     <Form className="">
    //       <p>Usermane:</p>
    //       <Field
    //         name="username"
    //         onChange={handleInputChange}
    //         placeholder="      username"
    //         className="flex mb-[7px] border-2 border-black rounded-s"
    //       />
    //       <p>email:</p>
    //       <Field
    //         type="email"
    //         name="email"
    //         onChange={handleInputChange}
    //         placeholder="      email"
    //         className="flex mb-[8px] border-2 border-black rounded-s"
    //       />
    //       <p>password:</p>
    //       <Field
    //         name="password"
    //         type="password"
    //         onChange={handleInputChange}
    //         onFocus={handleInputFocus}
    //         onBlur={handleInputBlur}
    //         placeholder="      password"
    //         className="flex mb-[8px] border-2 border-black rounded-s"
    //       />
    //       <p>confirm password:</p>
    //       <Field
    //         name="confirmPassword"
    //         type="password"
    //         onChange={handleInputChange}
    //         placeholder="Confirm password"
    //         className={`flex mb-[8px] border-2 rounded-s ${passwordMatchClass}`}
    //       />
    //       {isPasswordHintVisible && (
    //         <div className=" text-xs mb-[10px]">
    //           <ol className="flex flex-col items-start">
    //             {!conditions.minLength && <li>- at least 8 characters</li>}
    //             {!conditions.upperCase && <li>- one upper character</li>}
    //             {!conditions.specialChar && <li>- one special character !@#$%^&*</li>}
    //             {!conditions.containsNumber && <li>- at least one number (0-9)</li>}
    //           </ol>
    //         </div>
    //       )}
    //       <div className="flex">
    //         <label htmlFor="master">Master Admin? </label>
    //         <Field
    //           as="select"
    //           name="master"
    //           onChange={handleInputChange}
    //           className="flex mb-[8px] ml-[5px] border-2 border-black rounded-s"
    //         >
    //           <option value="0">Nu</option>
    //           <option value="1">DA</option>
    //         </Field>
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-[5vw] ml-[25%] border-2 border-black bg-green-500"
    //       >
    //         Submit
    //       </button>
    //     </Form>
    //   </Formik>
    // </div>
  );
}