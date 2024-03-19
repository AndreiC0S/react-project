import express, {Request, Response} from "express";
import * as bodyParser from "body-parser";

import * as adminModel from "../models/admin";
import {Admin} from "../types/Admin";
import { check , validationResult }  from 'express-validator/check';
import { generateToken } from '../jwt';
import { verifyToken } from '../jwt';

const adminRouter = express.Router();
var jsonParser = bodyParser.json();


adminRouter.get("/", async (req: Request, res: Response) => {
  if (!verifyToken(req, res)) {
    return res.status(403).json({"message": '<b>Trebue sa fi logat pentru a accesa aceasta zona!<b>'});
}
  adminModel.findAll((err: Error, users: Admin[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": users});
  });

});

adminRouter.get("/:id", async (req: Request, res: Response) => {
  if (!verifyToken(req, res)) {
    return res.status(403).json({"message": '<b>Trebue sa fi logat pentru a accesa aceasta zona!<b>'});
}
  const adminId: number = Number(req.params.id);
  adminModel.findOne(adminId, (err: Error, user: Admin) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": user});
  })
});

adminRouter.post("/",jsonParser,

  [
    check('username').not().isEmpty(),
    check('password', 'Password must be 8 or more characters').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[●!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{7,}$/, "i"),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: false }),
  ],
 

 async (req: Request, res: Response) => {
  console.log(" req.body = ", req.body);
  const errors = validationResult(req);
  console.log("errors = ", errors);
  if (!errors.isEmpty()) {
      return res.status(400).send({ 'message': errors.array() });
  }
  
  
  const newUser: Admin = req.body;
  adminModel.create(newUser, (err: Error, userId: number) => {
    if (err) {
      return res.status(500).send();
    }
    res.status(200).send();
  });
});

// Delete user
adminRouter.delete("/:username", jsonParser, async (req: Request, res: Response) => {
  if (!verifyToken(req, res)) {
    return res.status(403).json({"message": '<b>Trebue sa fi logat pentru a accesa aceasta zona!<b>'});
}
  const userId: string = req.params.username;
  

  console.log( "username", req.params.username);
  adminModel.deleteUser(userId , (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
    
  })
});

adminRouter.post("/veifyLogin",jsonParser, async (req: Request, res: Response) => {
  console.log(req.body);
  const loginUser: Admin = req.body;
  adminModel.veifyPassword(loginUser, (err: Error, user: Admin) => {
    if (err) {
      return res.status(401).send({
        accessToken: null,
      });
      //return res.status(500).json({"message": err.message});
    }

     var token = generateToken();
     console.log('JWT', token);
    //res.status(200).json({"message": 'success'});
    res.status(200).send({
      accessToken: token,
      master: user.master
    });
  });
});

adminRouter.post("/logout", async (req: Request, res: Response) => {
  return  res.status(200).json({
    accessToken: null,
    message: "User has been logged out."
  })
})

export {adminRouter};