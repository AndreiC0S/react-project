import React, { useState, useEffect } from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
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
              })
              .catch((err) => {
                // console.log(err);
                setLoading(false); // Hide loading screen
              });
          } else {
            // console.log(response.error.message);
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
            <form onSubmit={handleSubmit}>
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              <div>
                <Field
                  name="amount"
                  component="input"
                  type="number"
                  placeholder="Amount"
                  initialValue={totalPrice}
                />
                <Field
                  name="email"
                  component="input"
                  type="text"
                  placeholder="Your email"
                  initialValue="ion@demo.com"
                />
              </div>
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  initialValue="4242424242424242"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                  initialValue="Ion A"
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <h2>Values</h2>
            </form>
          )}
        />
      )}
    </Styles>
  );
}
