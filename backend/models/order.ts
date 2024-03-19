import { Orders } from "./../types/Orders";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

// Get all Orders

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM orders`;
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket[]>result;
    const orders: Orders[] = [];
    rows.forEach((row) => {
      const order: Orders = {
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

// Add Order
export const addProd = (order: Orders, callback: Function) => {
  const queryString =
    "INSERT INTO orders (country, address, items, paid_card, comments, status) VALUES (?, ?, ? , ? , ? , ?)";
  console.log("insert", order);

  try {
    console.log("insert", order);
    let sqldeb = db.query(
      queryString,
      [
        order.country,
        order.address,
        order.items,
        order.paid_card,
        order.comments,
        order.status,
      ],
      (err, result) => {
        // if (err) {
        //   callback(err);
        // }

        if (<OkPacket>result !== undefined) {
          const insertId = (<OkPacket>result).insertId;
          callback(null, insertId);
        } else {
          console.log("error insert");
          // callback(null, 0);
        }
      }
    );
    console.log(sqldeb.sql);
  } catch (error) {
    console.log("insert", order);
    callback(error);
  }
};

// update Product
export const update = (order: Orders, callback: Function) => {
  const queryString = `UPDATE orders SET country=?, address=?, items=?, paid_card=?, comments=?, status=? WHERE id_orders=?`;
  const itemsString = JSON.stringify(order.items);
  db.query(
    queryString,
    [
      order.country,
      order.address,
      itemsString,
      order.paid_card,
      order.comments,
      order.status,
      order.id_orders,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return callback(err);
      } else {
        console.log("trimis?");
        db.commit((commitErr) => {
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
    }
  );
};
