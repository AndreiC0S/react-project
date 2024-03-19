"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const userRouter_1 = require("./routes/userRouter");
const productsRouter_1 = require("./routes/productsRouter");
const adminRouter_1 = require("./routes/adminRouter");
const stripeRouter_1 = require("./routes/stripeRouter");
const orderRouter_1 = require("./routes/orderRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
const port = process.env.PORT;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use((0, cors_1.default)());
app.use("/users", userRouter_1.userRouter);
app.use("/products", productsRouter_1.prodRouter);
app.use("/admins", adminRouter_1.adminRouter);
app.use("/orders", orderRouter_1.orderRouter);
app.get('/', (req, res) => {
    //res.send('Express + TypeScript Server!!!!');
    res.sendFile(path_1.default.join(__dirname + '/acasa.html'));
    // res.sendFile(path.join(__dirname+'/product.html'));
});
app.use("/api/stripe-payment", stripeRouter_1.stripeRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
