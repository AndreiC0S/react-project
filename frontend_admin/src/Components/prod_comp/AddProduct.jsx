// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// export default function AddProduct() {
//   const validationSchema = Yup.object().shape({
//     nume_produs: Yup.string()
//       .min(2, "Too Short!")
//       .max(200, "Too Long!")
//       .required("Camp obligatoriu!"),
//     descriere_produs: Yup.string()
//       .min(2, "Too Short!")
//       .max(500, "Too Long!")
//       .required("Camp obligatoriu!"),
//     poza_url: Yup.string().required("Camp obligatoriu!"),
//     categorie_produs: Yup.string()
//       .min(2, "Too Short!")
//       .max(45, "Too Long!")
//       .required("Camp obligatoriu!"),
//     pret_produs: Yup.string()
//       .min(1, "Too Short!")

//       .required("Camp obligatoriu!"),
//   });

//   const [formData, setFormData] = useState({
//     nume_produs: "",
//     descriere_produs: "",
//     poza_url: "",
//     categorie_produs: "",
//     pret_produs: "",
//   });

//   const [err, setError] = useState(false);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     // console.log("formData", typeof formData.pret_produs);
//     try {
//       axios
//         .post(`http://localhost:3002/products/`, formData)
//         .then((res) => {
//           // setGetProd(res.data.data);
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     } catch (err) {
//       if (err.response.status === 401) {
//         alert("ceva nu a mers bine...");
//         setError(true);
//       }
//     }
//   };

//   return (
//     <div className="flex absolute top-[10.6vh]  flex-col border-2 border-black mt-[-2px] w-[20%]  p-[10px] items-center bg-gray-500">
//       <h1>Add Product</h1>
//       <Formik
//         initialValues={formData}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {({ errors, touched }) => (
//           <Form className="text-center">
//             <Field
//               name="nume_produs"
//               onChange={handleInputChange}
//               placeholder="      nume produs"
//               className="flex mb-[7px] border-2 border-black rounded-s"
//             />
//             {errors.nume_produs && touched.nume_produs ? (
//               <div className="mb-[10px]">{errors.nume_produs}</div>
//             ) : null}

//             <Field
//               as="textarea"
//               name="descriere_produs"
//               onChange={handleInputChange}
//               placeholder="      descriere produs"
//               className="flex mb-[8px] h-[20vh] w-[100%] border-2 border-black rounded-s"
//             />
//             {/* {errors.descriere_produs && touched.descriere_produs ? (
//               <div className="mb-[10px]">{errors.descriere_produs}</div>
//             ) : null} */}

//             <Field
//               name="poza_url"
//               onChange={handleInputChange}
//               placeholder="      poza url"
//               className="flex mb-[8px] border-2 border-black"
//             />
//             {/* {errors.poza_url && touched.poza_url ? <div className="mb-[10px]">{errors.poza_url}</div> : null} */}

//             <Field
//               name="categorie_produs"
//               onChange={handleInputChange}
//               placeholder="     categorie_produs"
//               className="flex mb-[8px] border-2 border-black rounded-s"
//             />
//             {/* {errors.categorie_produs && touched.categorie_produs ? (
//               <div className=" mb-[10px]">{errors.categorie_produs}</div>
//             ) : null} */}

//             <Field
//               name="pret_produs"
//               onChange={handleInputChange}
//               placeholder="     pret produs"
//               className="flex mb-[8px] border-2 border-black rounded-s"
//             />
//             {/* {errors.pret_produs && touched.pret_produs ? <div className="mb-[10px]">{errors.pret_produs}</div> : null} */}

//             <button
//               type="submit"
//               className="w-[5vw] ml-[25%] border-2 border-black bg-green-500"
//             >
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function AddProduct({ onClose }) {
 
  const validationSchema = Yup.object().shape({
    nume_produs: Yup.string()
      .min(2, "Too Short!")
      .max(200, "Too Long!")
      .required("Camp obligatoriu!"),
    descriere_produs: Yup.string()
      .min(2, "Too Short!")
      .max(500, "Too Long!")
      .required("Camp obligatoriu!"),
    poza_url: Yup.string().required("Camp obligatoriu!"),
    categorie_produs: Yup.string()
      .min(2, "Too Short!")
      .max(45, "Too Long!")
      .required("Camp obligatoriu!"),
    pret_produs: Yup.string()
      .min(1, "Too Short!")
      .required("Camp obligatoriu!"),
  });

  const [formData, setFormData] = useState({
    nume_produs: "",
    descriere_produs: "",
    poza_url: "",
    categorie_produs: "",
    pret_produs: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (values, actions) => {
    try {
      await axios.post(`http://localhost:3002/products/`, values);
      alert("Product added successfully!");
      actions.resetForm();
      onClose && onClose(); // Închide formularul dacă funcția onClose este furnizată
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="fixed top-[10.6vh] left-0 flex flex-col bg-white w-[20%] min-w-[300px] p-6 shadow-lg border border-gray-200 rounded-lg z-10">
      <h1 className="text-lg font-semibold text-gray-700 mb-4">Add Product</h1>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className="space-y-4 text-black">
          <Field
            onChange={handleInputChange}
            name="nume_produs"
            placeholder="Nume produs"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <Field
          onChange={handleInputChange}
            as="textarea"
            name="descriere_produs"
            placeholder="Descriere produs"
            className="w-full p-2 h-24 border border-gray-300 rounded-md"
          />
          <Field
          onChange={handleInputChange}
            name="poza_url"
            placeholder="Poza URL"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <Field
          onChange={handleInputChange}
            name="categorie_produs"
            placeholder="Categorie produs"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <Field
          onChange={handleInputChange}
            name="pret_produs"
            placeholder="Pret produs"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              Close
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
