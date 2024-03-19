"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.addProd = exports.findAll = void 0;
const db_1 = require("../db");
// Get all Orders
const findAll = (callback) => {
    const queryString = `SELECT * FROM orders`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const orders = [];
        rows.forEach((row) => {
            const order = {
                id_orders: row.id_orders,
                country: row.country,
                address: row.address,
                items: row.items,
                paid_card: row.paid_card,
                comments: row.comments,
                status: row.status,
            };
            orders.push(order);
        });
        callback(null, orders);
    });
};
exports.findAll = findAll;
// Add Order
const addProd = (order, callback) => {
    const queryString = "INSERT INTO orders (country, address, items, paid_card, comments, status) VALUES (?, ?, ? , ? , ? , ?)";
    console.log("insert", order);
    try {
        console.log("insert", order);
        let sqldeb = db_1.db.query(queryString, [
            order.country,
            order.address,
            order.items,
            order.paid_card,
            order.comments,
            order.status,
        ], (err, result) => {
            // if (err) {
            //   callback(err);
            // }
            if (result !== undefined) {
                const insertId = result.insertId;
                callback(null, insertId);
            }
            else {
                console.log("error insert");
                // callback(null, 0);
            }
        });
        console.log(sqldeb.sql);
    }
    catch (error) {
        console.log("insert", order);
        callback(error);
    }
};
exports.addProd = addProd;
// update Product
const update = (order, callback) => {
    const queryString = `UPDATE orders SET country=?, address=?, items=?, paid_card=?, comments=?, status=? WHERE id_orders=?`;
    const itemsString = JSON.stringify(order.items);
    db_1.db.query(queryString, [
        order.country,
        order.address,
        itemsString,
        order.paid_card,
        order.comments,
        order.status,
        order.id_orders,
    ], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        else {
            console.log("trimis?");
            db_1.db.commit((commitErr) => {
                if (commitErr) {
                    console.log(commitErr);
                    return callback(commitErr);
                }
                console.log("Committed successfully");
                callback(null);
                console.log("Query:", queryString);
                console.log("Values:", [
                    order.country,
                    order.address,
                    itemsString,
                    order.paid_card,
                    order.comments,
                    order.status,
                    order.id_orders,
                ]);
            });
        }
    });
};
exports.update = update;
