import React, { useEffect, useState } from "react";
import axios from "axios";
import CompleteOrder from "./CompleteOrders";

import "./orsers.css";

export default function Orders() {
  const [getOrder, setGetOrder] = useState([]);

  const [makePop, setMakePop] = useState(false);

  const [passOrd, setPassOrd] = useState([]);

  const dataProp = (
    id,
    country,
    address,
    items,
    paid_card,
    comments,
    status
  ) => {
    setMakePop(true);

    setPassOrd([]);

    const newOrder = {
      id: id,
      country: country,
      address: address,
      items: items,
      paid_card: paid_card,
      comments: comments,
      status: status,
    };

    setPassOrd((oldArray) => [...oldArray, newOrder]);
  };

  useEffect(() => {
    axios.get(`http://localhost:3002/orders`).then((res) => {
      const sortedOrder = res.data.data.sort((a, b) =>
        a.status !== "online" ? 1 : -1
      );
      setGetOrder(sortedOrder);
    });
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className=" flex flex-col bg-gray-500 w-[49vw] h-[83vh] overflow-auto ">
          {getOrder.map((Val, index) => {
            return (
              <div
                key={index}
                className="w-[47.5vw] min-h-[500px] mt-[5px] mb-[10px] bg-gray-300 rounded-md  "
              >
                <div className="flex flex-row items-center justify-between m-[5px]">
                  <div className="flex flex-col">
                    <p>Order ID: {Val.id_orders}</p>
                    <p>Country: {Val.country}</p>
                    <p>address: {Val.address}</p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        dataProp(
                          Val.id_orders,
                          Val.country,
                          Val.address,
                          Val.items,
                          Val.paid_card,
                          Val.comments,
                          Val.status
                        )
                      }
                    >
                      View
                    </button>
                  </div>
                  <div className="flex flex-col relative right-[0px]">
                    <div>
                      <p className="inline">Status: </p>
                      <p className={`inline ${Val.status} `}>{Val.status}</p>
                    </div>
                    <p className="">
                      Paid: {Val.paid_card === 1 ? "true" : "false"}
                    </p>
                  </div>
                </div>

                <div className="h-[410px]  overflow-auto">
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
                      {Val.items.map((itm, innerIndex) => {
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
              </div>
            );
          })}
        </div>

        {makePop && (
          <CompleteOrder
            key="CompleteOrderKey"
            makePop={setMakePop}
            passOrd={passOrd}
            setGetOrder={setGetOrder}
          />
        )}
      </div>
    </>
  );
}
