import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import  session, {Session} from "express-session";
import { userRouter } from './routes/userRouter';
import { prodRouter } from './routes/productsRouter';
import { adminRouter } from './routes/adminRouter';
import { stripeRouter } from './routes/stripeRouter';
import { orderRouter } from './routes/orderRouter';

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const port = process.env.PORT;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use("/users", userRouter);
app.use("/products", prodRouter);
app.use("/admins", adminRouter);
app.use("/orders", orderRouter);
app.get('/', (req: Request, res: Response) => {
  //res.send('Express + TypeScript Server!!!!');
  res.sendFile(path.join(__dirname+'/acasa.html'));
  // res.sendFile(path.join(__dirname+'/product.html'));
});
app.use("/api/stripe-payment", stripeRouter)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


