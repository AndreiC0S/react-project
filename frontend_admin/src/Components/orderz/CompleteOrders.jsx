import React, { useState, useEffect } from "react";
import axios from "axios";

import { Formik, Form, Field } from "formik";

export default function CompleteOrder({ makePop, passOrd }) {
  const [formData, setFormData] = useState({});
  // const [passData, setPassData] = useState([]);
  // console.log(formData.paid_cash);

  useEffect(() => {
    const newArr = {
      id_orders: passOrd[0].id,
      country: passOrd[0].country,
      address: passOrd[0].address,
      items: passOrd[0].items,
      paid_card: passOrd[0].paid_card,
      comments: passOrd[0].comments,
      status: passOrd[0].status,
    };
    setFormData(newArr);
  }, [passOrd]);

  // console.log("formData id", formData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // console.log("formData", passOrd[0].id);
    try {
      axios
        .put(`http://localhost:3002/orders/${formData.id_orders}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          makePop(false);
          // setGetProd(res.data.data);
        })
        .catch((error) => {
          console.error("Axios Error:", error);
          alert("ceva nu a mers bine... data nu s-a trimis");
          makePop(false);
        });
    } catch (err) {
      makePop(false);
      if (err.response.status === 401) {
        alert("ceva nu a mers bine...");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col ml-[10px] top-[7.5vh] bg-gray-300 w-[50vw] h-[83.35vh] overflow-auto">
        {/* <div className="flex flex-col">
          <p>Order ID: {passOrd[0].id}</p>
          <p>Country:{passOrd[0].country} </p>
          <p>address:{passOrd[0].address} </p>
        </div> */}
        <Formik
          initialValues={passOrd}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form>
            <button
              type="submit"
              className="w-[5vw] ml-[25%] border-2 border-black bg-green-500"
            >
              Submit
            </button>

            <div className="w-[47.5vw] max-h-[80vh] mt-[5px] mb-[10px] bg-gray-300 rounded-md  ">
              <div className="flex flex-row items-center justify-between m-[5px]">
                <div className="flex flex-col">
                  <p>Order ID: {formData.id_orders}</p>
                  <p className="inline">Country:</p>
                  <Field
                    name="country"
                    onChange={handleInputChange}
                    className={`inline shadow-md  border-2 border-black  `}
                  />
                  <p>address: {formData.address}</p>
                </div>
                <div></div>
                <div className="flex flex-col relative right-[0px]">
                  <div>
                    <p className="inline">Status: </p>

                    <Field
                      as="select"
                      name="status"
                      onChange={handleInputChange}
                    >
                      <option value="online">online</option>
                      <option value="canceled">canceled</option>
                      <option value="sent">sent</option>
                    </Field>
                  </div>
                  <p className="">
                    Paid: {formData.paid_card === 1 ? "true" : "false"}
                  </p>
                </div>
              </div>

              <table className=" w-full  bg-white  ">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">QTY</th>
                    <th scope="col">IMG</th>
                  </tr>
                </thead>

                <tbody className="">
                  {passOrd[0].items.map((itm, innerIndex) => {
                    return (
                      <tr key={innerIndex}>
                        <td>{itm.id}</td>
                        <td>{itm.title}</td>
                        <td>{itm.qty}</td>
                        <td className="flex justify-center">
                          <img
                            className="w-[200px] h-[100px]"
                            src={itm.img}
                            alt=""
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Form>
        </Formik>

        {/* <Formik
          initialValues={passOrd}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form className="flex flex-col  ">
            <Field
              name="address"
              onChange={handleInputChange}
              placeholder="      address"
              className={`flex shadow-md  border-2 border-black  `}
            />
            <Field
              name="poza_url"
              onChange={handleInputChange}
              placeholder="      poza url"
              className={`flex shadow-md shadow-black  border-2 border-black`}
            />

            <Field
              name="categorie_produs"
              onChange={handleInputChange}
              placeholder="     categorie_produs"
              className={`flex shadow-md shadow-black border-2 border-black`}
            />

            <Field
              name="pret_produs"
              onChange={handleInputChange}
              placeholder="     pret produs"
              className={`flex shadow-md shadow-black "border-2 border-black`}
            />

            <button
              type="submit"
              className="w-[5vw] ml-[25%] border-2 border-black bg-green-500"
            >
              Submit
            </button>
          </Form>
        </Formik> */}
      </div>
    </>
  );
}
