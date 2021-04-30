const express = require("express");
const connection = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  const { max_price } = req.query;
  let sql = "SELECT * FROM products";
  let sqlValues = [];

  if (max_price) {
    sql = "SELECT * FROM products WHERE price <= ?";
    sqlValues = [max_price];
  }
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving products from db.");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, results) => {
      if (results.length) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    }
  );
});

router.post("/", (req, res) => {
  const { name, price } = req.body;

  connection.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const createdProduct = { id: results.insertId, name, price };
        res.json(createdProduct);
      }
    }
  );
});

router.put("/:id", (req, res) => {
  connection.query(
    "UPDATE products SET ? WHERE id = ?",
    [req.body, req.params.id],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  connection.query(
    "DELETE FROM products WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (results.affectedRows) {
          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      }
    }
  );
});

module.exports = router;
