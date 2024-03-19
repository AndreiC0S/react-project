import { Products } from "./../types/Products";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

// Get all Products

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM products`;
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err); 
    }
    const rows = <RowDataPacket[]>result;
    const products: Products[] = [];
    rows.forEach((row) => {
      const product: Products = {
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


// AddProd
export const addProd = (product: Products, callback: Function) => {
  const queryString =
    "INSERT INTO products (nume_produs, descriere_produs, poza_url, categorie_produs, pret_produs) VALUES (?, ?, ? , ?, ?)";
  console.log("insert",product);
  
  try {
    console.log("insert",product);
    let sqldeb = db.query(
      queryString,
      [product.nume_produs, product.descriere_produs, product.poza_url , product.categorie_produs, product.pret_produs],
      (err, result) => {
        // if (err) {
        //   callback(err);
        // }
        
        if((<OkPacket>result) !== undefined){
          const insertId = (<OkPacket>result).insertId;
          callback(null, insertId);
        }
        else{
          console.log('error insert');
          // callback(null, 0);
        }
      }
    );
    console.log(sqldeb.sql);
  } catch (error) {
    console.log("insert",product);
    callback(error);
  }
};

// update Product
export const update = (product: Products, callback: Function) => {
  const queryString = `UPDATE products SET nume_produs=?, descriere_produs=?, poza_url=?, categorie_produs=?, pret_produs=? WHERE id=?`;

  db.query(queryString, [product.nume_produs, product.descriere_produs, product.poza_url, product.categorie_produs, product.pret_produs, product.id], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

// delete Product
export const deleteProd = (product: number, callback: Function) => {
  console.log(product);
  const queryString = `DELETE FROM products WHERE id=?`;

  db.query(queryString, [product], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};