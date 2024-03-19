"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProd = exports.update = exports.addProd = exports.findAll = void 0;
const db_1 = require("../db");
// Get all Products
const findAll = (callback) => {
    const queryString = `SELECT * FROM products`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const products = [];
        rows.forEach((row) => {
            const product = {
                id: row.id,
                nume_produs: row.nume_produs,
                descriere_produs: row.descriere_produs,
                poza_url: row.poza_url,
                categorie_produs: row.categorie_produs,
                pret_produs: row.pret_produs,
            };
            products.push(product);
        });
        callback(null, products);
    });
};
exports.findAll = findAll;
// AddProd
const addProd = (product, callback) => {
    const queryString = "INSERT INTO products (nume_produs, descriere_produs, poza_url, categorie_produs, pret_produs) VALUES (?, ?, ? , ?, ?)";
    console.log("insert", product);
    try {
        console.log("insert", product);
        let sqldeb = db_1.db.query(queryString, [product.nume_produs, product.descriere_produs, product.poza_url, product.categorie_produs, product.pret_produs], (err, result) => {
            // if (err) {
            //   callback(err);
            // }
            if (result !== undefined) {
                const insertId = result.insertId;
                callback(null, insertId);
            }
            else {
                console.log('error insert');
                // callback(null, 0);
            }
        });
        console.log(sqldeb.sql);
    }
    catch (error) {
        console.log("insert", product);
        callback(error);
    }
};
exports.addProd = addProd;
// update Product
const update = (product, callback) => {
    const queryString = `UPDATE products SET nume_produs=?, descriere_produs=?, poza_url=?, categorie_produs=?, pret_produs=? WHERE id=?`;
    db_1.db.query(queryString, [product.nume_produs, product.descriere_produs, product.poza_url, product.categorie_produs, product.pret_produs, product.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
// delete Product
const deleteProd = (product, callback) => {
    console.log(product);
    const queryString = `DELETE FROM products WHERE id=?`;
    db_1.db.query(queryString, [product], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.deleteProd = deleteProd;
