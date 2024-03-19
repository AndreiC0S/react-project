import React, { useState, useContext } from "react";
import "./LoginPopup.css";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { AuthContext } from "../../context/authContext";

import { lrContext } from '../../context/lrContext'

export default function LoginPopup({ isUser }) {
  const useLrContext = () => useContext(lrContext)
  const { logState, handleToggleLog, regState, handleToggleReg } = useLrContext();
  
  
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresa de email invalida!")
      .required("Camp obligatoriu!"),
    parola: Yup.string().required("Camp obligatoriu!"),
  });
  const habdlePops = () =>{
    handleToggleReg()
    handleToggleLog()
  }
  const [formData, setFormData] = useState({
    email: "",
    parola: "",
  });

  const [err, setError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      await login(formData); // await axios.post("/users/login", inputs);
      isUser();
      handleToggleLog()
    } catch (err) {
      if (err.response.status === 401) {
        alert("nume sau parola gresita");
        setError(true);
        // console.log(err)
      }
    }
  };
  return (
    <>
    

    <div  id="shade" className="z-[999]">
      
      <div className=" absolute flex justify-center z-[999] w-full bg-gradient-to-r from-amber-400  to-purple-500 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 " id="top">
        <div
          id="LoginPopup"
          className=" p-6 space-y-4 md:space-y-6 sm:p-8  "
        >
          
          <button
            className="absolute top-[1vh] right-[0.5vw] bg-black border-solid border-2 border-black p-[5px] rounded-[20px]"
            onClick={handleToggleLog}
          >
            X
          </button>

          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Formik
            initialValues={formData}
            onSubmit={handleSubmit}
            enableReinitialize
            validationSchema={validationSchema}
          >
            <Form className="space-y-2 md:space-y-6">
              {err && (
                <p className="text-red-700 mb-[1vh]">
                  {" "}
                  Email sau parola gresita
                </p>
              )}
              <div>

              <label htmlFor="email" className="block text-md font-medium text-gray-900">Your email</label>
              <Field
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                onChange={handleInputChange}
                type="text"
                
                name="email"
                placeholder="   name@company.com"
                
              />
              </div>
                <div>
                <label htmlFor="parola" className="block  text-md font-medium text-gray-900 dark:text-white">Password</label>
              <Field
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                onChange={handleInputChange}
                name="parola"
                type="password"
                autoComplete="off"
                placeholder="   ••••••••"
              />
                </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
                <p className="text-sm font-light text-black-500 ">
                      Don't have an account yet? <button onClick={habdlePops}>Sign up </button> 
                  </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
    
    </>
  );
}
