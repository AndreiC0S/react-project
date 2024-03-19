import express, {Request, Response} from "express";
import * as bodyParser from "body-parser";

import { check , validationResult }  from 'express-validator/check';
// import path from "path";
import * as orderModel from "../models/order";
import {Orders} from "../types/Orders";

const orderRouter = express.Router();
var jsonParser = bodyParser.json();


orderRouter.get("/", async (req: Request, res: Response) => {
    orderModel.findAll((err: Error, order: Orders[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": order});
  });
});



//create product
orderRouter.post("/",jsonParser, 
[
  check('country').not().isEmpty(),
  check('address',).not().isEmpty(),
  check('items',).not().isEmpty(),
  
  
],

async (req: Request, res: Response) => {

  const errors = validationResult(req);
  console.log("errorz = ", errors);
  
  if (!errors.isEmpty()) {
    console.log('is empty', errors)
      return res.status(400).send({ 'message': errors.array() });
      // return res.writeHead( 400, 'Current password does not match', {'content-type' : 'text/plain'});
  }

  // console.log(req.body);
  // // console.log('files',req.files);
  const newOrder: Orders = req.body;

  orderModel.addProd(newOrder, (err: Error, orderId: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"message": 'Datele au fost introduse cu succes'});
  });
});

//edit product
orderRouter.put("/:id",jsonParser, async (req: Request, res: Response) => {

    const editOrder: Orders = req.body;
    console.log("req.body",req.body);

    orderModel.update(editOrder, (err: Error) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({"message": err.message});
      }
  
      console.log("Order updated successfully");
      res.status(200).json({
        "message": 'success'
        });
    })
  });
  





export {orderRouter};