"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodRouter = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const check_1 = require("express-validator/check");
const prodModel = __importStar(require("../models/product"));
const prodRouter = express_1.default.Router();
exports.prodRouter = prodRouter;
var jsonParser = bodyParser.json();
prodRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    prodModel.findAll((err, products) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "data": products });
    });
}));
//create product
prodRouter.post("/", jsonParser, [
    (0, check_1.check)('nume_produs').not().isEmpty(),
    (0, check_1.check)('descriere_produs').not().isEmpty(),
    (0, check_1.check)('poza_url').not().isEmpty(),
    (0, check_1.check)('categorie_produs').not().isEmpty(),
    (0, check_1.check)('pret_produs').not().isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, check_1.validationResult)(req);
    console.log("errorz = ", errors);
    if (!errors.isEmpty()) {
        console.log('is empty', errors);
        return res.status(400).send({ 'message': errors.array() });
        // return res.writeHead( 400, 'Current password does not match', {'content-type' : 'text/plain'});
    }
    // console.log(req.body);
    // // console.log('files',req.files);
    const newProd = req.body;
    prodModel.addProd(newProd, (err, prodId) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "message": 'Datele au fost introduse cu succes' });
    });
}));
//edit product
prodRouter.put("/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const editProd = req.body;
    console.log("req.body", req.body);
    prodModel.update(editProd, (err) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        // res.status(200).send();
        res.status(200).json({
            "message": 'success'
        });
    });
}));
// Delete 
prodRouter.delete("/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodId = Number(req.params.id);
    console.log(prodId);
    prodModel.deleteProd(prodId, (err) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        // res.status(200).send();
        res.status(200).json({
            "message": 'success'
        });
    });
}));
