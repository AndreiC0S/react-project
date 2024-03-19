import React, { useState, useEffect } from "react";
import axios from "axios";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./css/edit_proc.css";

export default function EditProduct({ setEditProd, passData, dataProp }) {
  // console.log("passData", passData[0].id);
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

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const defaultData = {
      id: "",
      nume_produs: "",
      descriere_produs: "",
      poza_url: "",
      categorie_produs: "",
      pret_produs: "",
    };

    const newArr =
      passData && passData[0]
        ? {
            id: passData[0].id || defaultData.id,
            nume_produs: passData[0].nume_produs || defaultData.nume_produs,
            descriere_produs:
              passData[0].descriere_produs || defaultData.descriere_produs,
            poza_url: passData[0].poza_url || defaultData.poza_url,
            categorie_produs:
              passData[0].categorie_produs || defaultData.categorie_produs,
            pret_produs: passData[0].pret_produs || defaultData.pret_produs,
          }
        : defaultData;

    setFormData(newArr);
  }, [passData]);

  // useEffect(() => {
  //   const newArr = {
  //     id: passData[0].id,
  //     nume_produs: passData[0].nume_produs,
  //     descriere_produs: passData[0].descriere_produs,
  //     poza_url: passData[0].poza_url,
  //     categorie_produs: passData[0].categorie_produs,
  //     pret_produs: passData[0].pret_produs,
  //   };
  //   setFormData(newArr);
  // }, [passData]);

  // useEffect(()=>{
  //   const newArr = {
  //   id: passData[0].id,
  //   nume_produs: passData[0].nume_produs,
  //   descriere_produs: passData[0].descriere_produs,
  //   poza_url: passData[0].poza_url,
  //   categorie_produs: passData[0].categorie_produs,
  //   pret_produs: passData[0].pret_produs,
  //   }
  //   setFormData(newArr)

  // },[dataProp])

  const [err, setError] = useState(false);

  const [classErr, setClassErr] = useState(true);

  const [isClass, setClass] = useState(
    "border-[5px] roumded-lg border-red-500"
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      await axios.put(
        `http://localhost:3002/products/${passData[0].id}`,
        formData
      );
      setEditProd(false).catch((error) => {
        alert(error);
        setEditProd(false);
      });
    } catch (err) {
      setEditProd(false);
      if (err.response.status === 401) {
        alert("ceva nu a mers bine...");
        setError(true);
      }
    }
  };

  return (
    <div
  id="editBox"
  className="flex absolute flex-col right-[30%]  bg-gray-100 dark:bg-gray-700 w-[350px] h-[700px] overflow-auto space-y-4 py-4 text-center items-center z-40 rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg"
>
  <button
    onClick={() => setEditProd(false)}
    className="self-end mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-2xl"
  >
    X
  </button>
  <img
    className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-md mt-4"
    src={passData[0].poza_url}
    alt="img"
  />
  <Formik
    initialValues={{
      nume_produs: formData.nume_produs || "",
      descriere_produs: formData.descriere_produs || "",
      poza_url: formData.poza_url || "",
      categorie_produs: formData.categorie_produs || "",
      pret_produs: formData.pret_produs || "",
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    enableReinitialize
  >
    {({ errors, touched }) => (
      <Form className="flex flex-col space-y-2 w-full px-4">
        <Field
          name="nume_produs"
          onChange={handleInputChange}
          placeholder="Nume produs"
          className={`shadow-inner focus:ring-2 focus:ring-green-500 focus:outline-none ${
            errors.nume_produs && touched.nume_produs
              ? "ring-2 ring-red-500"
              : "border border-gray-300"
          } rounded-md py-2 px-3`}
        />

        <Field
          as="textarea"
          name="descriere_produs"
          onChange={handleInputChange}
          placeholder="Descriere produs"
          className={`shadow-inner focus:ring-2 focus:ring-green-500 focus:outline-none h-24 ${
            errors.descriere_produs && touched.descriere_produs
              ? "ring-2 ring-red-500"
              : "border border-gray-300"
          } rounded-md py-2 px-3`}
        />

        <Field
          name="poza_url"
          onChange={handleInputChange}
          placeholder="URL poza"
          className={`shadow-inner focus:ring-2 focus:ring-green-500 focus:outline-none ${
            errors.poza_url && touched.poza_url
              ? "ring-2 ring-red-500"
              : "border border-gray-300"
          } rounded-md py-2 px-3`}
        />

        <Field
          name="categorie_produs"
          onChange={handleInputChange}
          placeholder="Categorie produs"
          className={`shadow-inner focus:ring-2 focus:ring-green-500 focus:outline-none ${
            errors.categorie_produs && touched.categorie_produs
              ? "ring-2 ring-red-500"
              : "border border-gray-300"
          } rounded-md py-2 px-3`}
        />

        <Field
          name="pret_produs"
          onChange={handleInputChange}
          placeholder="Preț produs"
          className={`shadow-inner focus:ring-2 focus:ring-green-500 focus:outline-none ${
            errors.pret_produs && touched.pret_produs
              ? "ring-2 ring-red-500"
              : "border border-gray-300"
          } rounded-md py-2 px-3`}
        />

        <button
          type="submit"
          className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </Form>
    )}
  </Formik>
</div>

    // <div
    //   id="editBox"
      
    //   // className="flex absolute flex-col space-y-8 text-center items-center w-[30vw] h-[80.3vh] left-[20%] top-[10.5%]   z-40 rounded-md "
    //   className="flex absolute flex-col float-left  right-0 bg-gray-500  w-[350px] h-[700px]  overflow-auto space-y-8 text-center items-center z-40 rounded-md"
    //   // className="flex absolute flex-col bg-gray-500 w-[350px] h-[700px] overflow-auto space-y-8 text-center items-center z-40 rounded-md"
    // >
    //   <button
    //     onClick={() => setEditProd(false)}
    //     className="flex  text-xl"
    //   >
    //     X
    //   </button>
    //   <img
    //     className=" w-[10vw] h-[15vh] rounded-lg shadow-lg shadow-black mt-[10px]"
    //     src={passData[0].poza_url}
    //     alt="img"
    //   />
    //   <Formik
    //     initialValues={{
    //       nume_produs: formData.nume_produs || "",
    //       descriere_produs: formData.descriere_produs || "",
    //       poza_url: formData.poza_url || "",
    //       categorie_produs: formData.categorie_produs || "",
    //       pret_produs: formData.pret_produs || "",
    //     }}
    //     validationSchema={validationSchema}
    //     onSubmit={handleSubmit}
    //     enableReinitialize
    //   >
    //     {({ errors, touched }) => (
    //       <Form className="flex flex-col space-y-5 ">
    //         <Field
    //           name="nume_produs"
    //           onChange={handleInputChange}
    //           placeholder="      nume produs"
    //           className={`flex shadow-md shadow-black  ${
    //             errors.nume_produs && touched.nume_produs
    //               ? isClass
    //               : "border-2 border-black"
    //           }  `}
    //         />

    //         <Field
    //           as="textarea"
    //           name="descriere_produs"
    //           onChange={handleInputChange}
    //           placeholder="      descriere produs"
    //           className={`flex  h-[20vh] w-[100%] shadow-md shadow-black ${
    //             errors.descriere_produs && touched.descriere_produs
    //               ? isClass
    //               : "border-2 border-black"
    //           }`}
    //         />
    //         {/* {errors.descriere_produs && touched.descriere_produs
    //           ? setClassErr(true)
    //           : setClassErr(false)} */}

    //         <Field
    //           name="poza_url"
    //           onChange={handleInputChange}
    //           placeholder="      poza url"
    //           className={`flex shadow-md shadow-black  ${
    //             errors.poza_url && touched.poza_url
    //               ? isClass
    //               : "border-2 border-black"
    //           }`}
    //         />

    //         <Field
    //           name="categorie_produs"
    //           onChange={handleInputChange}
    //           placeholder="     categorie_produs"
    //           className={`flex shadow-md shadow-black ${
    //             errors.categorie_produs && touched.categorie_produs
    //               ? isClass
    //               : "border-2 border-black"
    //           }`}
    //         />

    //         <Field
    //           name="pret_produs"
    //           onChange={handleInputChange}
    //           placeholder="     pret produs"
    //           className={`flex shadow-md shadow-black ${
    //             errors.pret_produs && touched.pret_produs
    //               ? isClass
    //               : "border-2 border-black"
    //           }`}
    //         />

    //         <button
    //           type="submit"
    //           className="w-[5vw] ml-[25%] border-2 border-black bg-green-500"
    //         >
    //           Submit
    //         </button>
    //       </Form>
    //     )}
    //   </Formik>
    // </div>
  );
}
