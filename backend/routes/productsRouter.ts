import express, {Request, Response} from "express";
import * as bodyParser from "body-parser";
import fileUpload, { UploadedFile } from 'express-fileupload';
import { check , validationResult }  from 'express-validator/check';
import path from "path";
import * as prodModel from "../models/product";
import {Products} from "../types/Products";
const prodRouter = express.Router();
var jsonParser = bodyParser.json();


prodRouter.get("/", async (req: Request, res: Response) => {
    prodModel.findAll((err: Error, products: Products[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": products});
  });
});



//create product
prodRouter.post("/",jsonParser, 
[
  check('nume_produs').not().isEmpty(),
  check('descriere_produs',).not().isEmpty(),
  check('poza_url',).not().isEmpty(),
  check('categorie_produs',).not().isEmpty(),
  check('pret_produs',).not().isEmpty(),
  
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
  const newProd: Products = req.body;

  prodModel.addProd(newProd, (err: Error, prodId: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"message": 'Datele au fost introduse cu succes'});
  });
});

//edit product
prodRouter.put("/:id",jsonParser, async (req: Request, res: Response) => {

    const editProd: Products = req.body;
    console.log("req.body",req.body);
    prodModel.update(editProd, (err: Error) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
  
      // res.status(200).send();
      res.status(200).json({
        "message": 'success'
        });
    })
  });
  
  // Delete 
  prodRouter.delete("/:id",jsonParser, async (req: Request, res: Response) => {
    
    const prodId: number = Number(req.params.id) ;

  console.log(prodId);

  prodModel.deleteProd(prodId, (err: Error) => {

    if (err) {
      return res.status(500).json({"message": err.message});
    }
  
      // res.status(200).send();
      res.status(200).json({
        "message": 'success'
        });
    })
  });




export {prodRouter};