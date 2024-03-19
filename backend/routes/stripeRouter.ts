import express, {Request, Response} from "express";
import * as bodyParser from "body-parser";


const stripeRouter = express.Router();
var jsonParser = bodyParser.json();


stripeRouter.post("/",jsonParser, async (req: Request, res: Response) => {
    const stripe = require("stripe")(
        "sk_test_51GzggsIbQhbUWVMR2IGIOZf5ntVr31t4fCWgZU52EHdvQqERxQ8bMO6pCei347emSKrwawGrusR7GYZ4bkh1UmxX00opC8e087"
      );
    
      const { amount, email, token } = req.body;
    
      stripe.customers
        .create({
          email: email,
          source: token.id,
          name: token.card.name,
        })
        .then((customer) => {
          return stripe.charges.create({
            amount: parseFloat(amount) * 100,
            description: `Payment for USD ${amount}`,
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge) => res.status(200).send(charge))
        .catch((err) => console.log(err));
})

export {stripeRouter};