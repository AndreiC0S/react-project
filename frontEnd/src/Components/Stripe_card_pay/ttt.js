import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002/api";

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Stripe({ totalPrice, cartContent }) {
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


 
  const keykart = ['id', 'title', 'img', 'qty']

  const [valueKart, setValueKart] = useState([])

  const [finalObj, setFinalObj] = useState([])

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
  
    console.log('Updated valueKart:', updatedValueKart);
    console.log('Updated finalObj:', updatedFinalObj);

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

  // const sendCart =   (a) => {
    
    
  //    a.map(elem => {
  //     let keyMap=  (keykart.map(itm => {
  //       return elem[itm]
  //    }))
  //    console.log('1 map-keykart', keyMap)

  //     setValueKart(oldArray => [...oldArray, keyMap])

  //   console.log('1 map-setValueKart', valueKart)


  //   })
  //   valueKart.map(elem => {

  //     const rezultObj = Object.fromEntries(keykart.map((key, index) => [key, elem[index]]))
  //     setFinalObj(oldArray => [...oldArray, rezultObj])
  //     console.log('valueKart in map', valueKart)
  //   })
  //   console.log('finalObj', finalObj)
  // }
    

  
    
 


  const onSubmit = async (values) => {
    // await sleep(300);
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
              
              // .then((res)=> )
              .catch((err) => console.log(err));
              sendCart(cartContent)
              // console.log('cartContent',cartContent)
            
          } else {
            console.log(response.error.message);
          }
        }
      );
    } catch (error) { }
  };

  return (
    <Styles>
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => {
          return (
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
          );
        }}
      />
    </Styles>
  );
}

// render(<App />, document.getElementById("root"));
