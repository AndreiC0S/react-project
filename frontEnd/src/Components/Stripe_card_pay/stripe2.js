import React, { useState, useEffect, useContext } from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import { CartContext } from "../../context/cartContext";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import axios from "axios";
import LoadingScreen from "./LoadingScreen"; // Import the LoadingScreen component


axios.defaults.baseURL = "http://localhost:3002/api";

export default function Stripe({ totalPrice, cartContent }) {
  const keykart = ['id', 'title', 'img', 'qty'];
  const [valueKart, setValueKart] = useState([]);
  const [finalObj, setFinalObj] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading screen
  const [redirectToHome, setRedirectToHome] = useState(false); // State for redirection

  const { content, setContent } = useContext(CartContext);

  const clearCart = () => {

    setContent([]);
  };

  useEffect(() => {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51GzggsIbQhbUWVMRAjLXMJv3Y4Gt1Gh2rAbMhqHnyHSz2aXOSDzCLyMSsTpfgaVUqn3jRxWrmzSGmIfCg5VqHke900MhDTICYE"
        );
      };
      window.document.body.appendChild(s);
    }
  }, []);

  const sendCart = (a) => {
    const updatedValueKart = [...valueKart];
    a.map((elem) => {
      let keyMap = keykart.map((itm) => {
        return elem[itm];
      });
      updatedValueKart.push(keyMap);
    });

    setValueKart(updatedValueKart);

    const updatedFinalObj = [...finalObj];
    updatedValueKart.map((elem) => {
      const rezultObj = Object.fromEntries(
        keykart.map((key, index) => [key, elem[index]])
      );
      updatedFinalObj.push(rezultObj);
    });

    setFinalObj(updatedFinalObj);

    axios
      .post("http://localhost:3002/orders", {
        country: 'Romania',
        address: 'trandafirilor 11',
        items: JSON.stringify(updatedFinalObj),
        paid_card: 1,
        comments: 'none',
        status: 'online'
      })

      .catch((err) => console.log('kart err', err));
  };

  const onSubmit = async (values) => {
    setLoading(true); // Display loading screen
    try {
      window.Stripe.card.createToken(
        {
          number: values.number,
          exp_month: values.expiry.split("/")[0],
          exp_year: values.expiry.split("/")[1],
          cvc: values.cvc,
          name: values.name,
        },
        (status, response) => {
          if (status === 200) {
            axios
              .post("/stripe-payment", {
                token: response,
                email: values.email,
                amount: values.amount,
              })
              .then(() => {
                sendCart(cartContent);
                setLoading(false); // Hide loading screen
                setRedirectToHome(true); // Redirect to the homepage
                clearCart()
              })
              .catch((err) => {
                console.log(err);
                setLoading(false); // Hide loading screen
              });
          } else {
            console.log(response.error.message);
            setLoading(false); // Hide loading screen
          }
        }
      );
    } catch (error) {
      setLoading(false); // Hide loading screen
    }
  };

  if (redirectToHome) {
    // Redirect to the homepage
    window.location.href = "/"; // Change this URL to the homepage URL
  }

  return (
    <Styles>
      {loading ? ( // Show loading screen if loading is true
        <LoadingScreen />
      ) : (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values, active }) => (
            <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-md mx-auto p-4 space-y-4 bg-white rounded-lg shadow-lg">
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              <div className="space-y-2">
                <Field
                  name="amount"
                  component="input"
                  type="number"
                  placeholder="Amount"
                  initialValue={totalPrice}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  readOnly // Make the "Amount" field read-only
                />
                <Field
                  name="email"
                  component="input"
                  type="text"
                  placeholder="Your email"
                  initialValue="ion@demo.com"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  validate={(value) => (value ? undefined : 'Email is required')}
                />
              </div>
              <div className="space-y-2">
                <Field
                  name="number"
                  component="input"
                  
                  
                  placeholder="Card Number"
                  
                  format={formatCreditCardNumber}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  validate={(value) => (value ? undefined : 'Card Number is required')}
                />
              </div>
              <div className="space-y-2">
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                  initialValue="Ion A"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  validate={(value) => (value ? undefined : 'Name is required')}
                />
              </div>
              <div className="space-y-2">
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                  className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  validate={(value) => (value ? undefined : 'Expiry is required')}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                  className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  validate={(value) => (value ? undefined : 'CVC is required')}
                />
              </div>
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  className="w-full py-2 bg-gray-300 text-gray-600 font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400"
                >
                  Reset
                </button>
              </div>

            </form>
          )}
        />
      )}
    </Styles>

  );
}
