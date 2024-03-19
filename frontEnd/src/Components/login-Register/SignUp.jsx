// import React, { useState, useContext } from "react";
// import axios from "axios";
// // import Login from "../login-Register/Login";
// // import { Link, useLocation } from "react-router-dom";
// import "./LoginPopup.css";
// import LoadingScreen from "../Stripe_card_pay/LoadingScreen"; // Import the LoadingScreen component
// import { lrContext } from '../../context/lrContext'
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// export default function SignUp({ toggleS }) {

//   const useLrContext = () => useContext(lrContext)
//   const { logState, handleToggleLog, regState, handleToggleReg } = useLrContext();
//   // const { register } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);

//   const validationSchema = Yup.object().shape({
//     nume:Yup.string().required("Camp obligatoriu!"),
//     prenume:Yup.string().required("Camp obligatoriu!"),
//     email: Yup.string()
//       .email("Adresa de email invalida!")
//       .required("Camp obligatoriu!"),
//     parola: Yup.string().required("Camp obligatoriu!"),
//   });

//   const [formData, setFormData] = useState({
//     nume:"",
//     prenume:"",
//     email: "",
//     parola: "",
//   });

//   const [err, setError] = useState(false);

//   const habdlePops = () =>{
//     handleToggleReg()
//     handleToggleLog()
//   }

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmitR = async (values) => {
//     try {
//       await axios.post("http://localhost:3002/users", values);

//       alert("daaaa");
//       handleToggleReg();
//     } catch (err) {
//       if (err.response) {
//         const errorData = err.response.data;
//         if (errorData.message === "Email already exists!") {
//           alert(JSON.stringify(errorData.message));
//       } else {
//         alert(JSON.stringify(errorData.message[0].msg));
//       }

//     } else {
//         alert("A apărut o eroare la comunicarea cu serverul.");
//     }
//   }

//   };

//   return (
//     <>

//       <div
//         id="shadeSign"
//         className="flex fixed w-[100vw] h-[100vh] justify-center items-center z-[999] top-[0px] left-[0px]"
//       >
//         <div
//           className="absolute flex justify-center z-[999] w-full bg-gradient-to-r from-amber-400  to-purple-500 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 "
//           id="top"
//         >
//           <div className=" p-6 space-y-4 md:space-y-6 sm:p-8  ">
//             <button
//               className="absolute top-[1vh] right-[0.5vw] bg-black border-solid border-2 border-black p-[5px] rounded-[20px]"
//               onClick={handleToggleReg}
//             >
//               X
//             </button>
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
//               Create account
//             </h1>
//             <Formik
//               initialValues={formData}
//               onSubmit={handleSubmitR}
//               enableReinitialize
//               validationSchema={validationSchema}
//             >

//               <Form className="space-y-2 md:space-y-6">

//                 <div>
//                   <label
//                     htmlFor="nume"
//                     className="block text-md font-medium text-gray-900"
//                   >
//                     First Name
//                   </label>
//                   <Field
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
//                     onChange={handleInputChange}
//                     type="text"

//                     name="nume"
//                     placeholder="   "
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="prenume"
//                     className="block text-md font-medium text-gray-900"
//                   >
//                     Last Name
//                   </label>
//                   <Field
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
//                     onChange={handleInputChange}
//                     type="text"

//                     name="prenume"
//                     placeholder="   "
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-md font-medium text-gray-900"
//                   >
//                     Your email
//                   </label>
//                   <Field
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
//                     onChange={handleInputChange}
//                     type="text"

//                     name="email"
//                     placeholder="   name@company.com"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="parola"
//                     className="block  text-md font-medium text-gray-900 dark:text-white"
//                   >
//                     Password
//                   </label>
//                   <Field
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
//                     onChange={handleInputChange}
//                     name="parola"
//                     type="password"
//                     autoComplete="off"
//                     placeholder="   ••••••••"
//                   />
//                 </div>

//                 <div className="mt-8">
//                   <button
//                     type="submit"
//                     className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                   >
//                     Register
//                   </button>
//                 </div>
//               </Form>
//             </Formik>
//             <div className="flex text-sm font-light text-black-500 dark:text-gray-400">
//               <p className="mr-[5px]">Have an account?</p><button onClick={habdlePops}>Login</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useState, useContext } from "react";
import axios from "axios";
import "./LoginPopup.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { lrContext } from "../../context/lrContext";
import LoadingScreen from "../Stripe_card_pay/LoadingScreen"; // Import the LoadingScreen component


export default function SignUp({ toggleS }) {
  const useLrContext = () => useContext(lrContext);
  const {handleToggleLog, handleToggleReg, regSucc, setRegSucc } =
    useLrContext();
  const [loading, setLoading] = useState(false); // State to control loading screen visibility
  

  // Form validation schema
  const validationSchema = Yup.object().shape({
    nume: Yup.string().required("First Name is required!"),
    prenume: Yup.string().required("Last Name is required!"),
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required!"),
    parola: Yup.string().required("Password is required!"),
    confirmParola: Yup.string()
      .oneOf([Yup.ref("parola"), null], "Passwords must match") // Ensure password matches
      .required("Confirm Password is required"),
  });

  // Form data state
  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    email: "",
    parola: "",
    confirmParola: "",
  });

  const habdlePops = () => {
    handleToggleReg();
    handleToggleLog();
  };

  // Function to handle input change in the form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

 

  // Function to handle form submission
  const handleSubmitR = async (values, actions) => {
    try {
      setLoading(true); // Activate loading screen before sending data
      await axios.post("http://localhost:3002/users", values); // Send form data to server
      
      
      // alert("Success!"); // Show success message
      handleToggleReg(); // Close registration form
      setLoading(false);
      setRegSucc(true)
      setTimeout(() => {
        setRegSucc(false);
      }, 4000);
    } catch (err) {
      if (err.response) {
        const errorData = err.response.data;
        if (errorData.message === "Email already exists!") {
          alert(JSON.stringify(errorData.message));
          setLoading(false)
        } else {
          alert(JSON.stringify(errorData.message[0].msg));
          setLoading(false)
        }
      } else {
        alert("A apărut o eroare la comunicarea cu serverul.");
      }
    } 
  };

  return (
    <>
    
      {loading && 
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[999] bg-black bg-opacity-50">
      <LoadingScreen />
    </div>
    }{" "}
      {/* Show loading screen if loading state is true */}
      <div
        id="shadeSign"
        className={`flex fixed w-[100vw] h-[100vh] justify-center items-center z-[998] top-[0px] left-[0px] ${
          loading ? "pointer-events-none" : ""
        }`} // Disable pointer events on the entire section while loading
      >
        <div
          className="absolute flex justify-center z-[999] w-full bg-gradient-to-r from-amber-400  to-purple-500 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 "
          id="top"
        >
          <div className=" p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <button
              className="absolute top-[1vh] right-[0.5vw] bg-black border-solid border-2 border-black p-[5px] rounded-[20px]"
              onClick={handleToggleReg}
            >
              X
            </button>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
              Create account
            </h1>
            
            

            <Formik
              initialValues={formData}
              onSubmit={handleSubmitR}
              enableReinitialize
              validationSchema={validationSchema}
            >
              <Form className="space-y-2 md:space-y-6">
                <div>
                  <label
                    htmlFor="nume"
                    className="block text-md font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    onChange={handleInputChange}
                    type="text"
                    name="nume"
                    placeholder="   "
                  />
                </div>
                {/* Last Name Input */}
                <div>
                  <label
                    htmlFor="prenume"
                    className="block text-md font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    onChange={handleInputChange}
                    type="text"
                    name="prenume"
                    placeholder="   "
                  />
                </div>
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-gray-900"
                  >
                    Your Email
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    onChange={handleInputChange}
                    type="text"
                    name="email"
                    placeholder="   name@company.com"
                  />
                </div>
                {/* Password Input */}
                <div>
                  <label
                    htmlFor="parola"
                    className="block text-md font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                    onChange={handleInputChange}
                    name="parola"
                    type="password"
                    autoComplete="off"
                    placeholder="   ••••••••"
                  />
                </div>
                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmParola"
                    className="block text-md font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                    onChange={handleInputChange}
                    name="confirmParola"
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
                    Register
                  </button>
                </div>
              </Form>
            </Formik>
            <div className="flex text-sm font-light text-black-500 dark:text-gray-400">
              <p className="mr-[5px]">Have an account?</p>
              <button onClick={habdlePops}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

