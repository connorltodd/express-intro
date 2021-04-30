const express = require("express");
const morgan = require("morgan");
const connection = require("./db");
const serverPort = 5000;

// init the express app
const app = express();
const productsRouter = require("./routes/products.route");

// convert body to json
app.use(express.json());
app.use(morgan("dev"));
app.use("/products", productsRouter);

connection.connect((err) => {
  if (err) {
    console.error("error connecting to db");
  } else {
    console.log("connected to db");
  }
});

// listen to incoming requests
app.listen(serverPort, () => console.log("Express server is running"));

// // define the index route
// app.get("/", (req, res) => {
//   console.log("A new request just hit the API !");
//   res.send("Hello dear API client :)");
// });

// const things = [
//   { id: 1, name: "Socks" },
//   { id: 2, name: "Computer" },
//   { id: 3, name: "Passion" },
// ];
// app.get("/things", (req, res) => {
//   res.send(things);
// });

// app.get("/things/:id", (req, res) => {
//   const parsedThingId = parseInt(req.params.id);
//   const thing = things.find((thing) => thing.id === parsedThingId);
//   if (thing) {
//     res.send(thing);
//   } else {
//     res.sendStatus(404);
//   }
// });

// let newId = 4;

// app.post("/things", (req, res) => {
//   const { name } = req.body;
//   const newThing = { id: newId++, name };
//   things.push(newThing);
//   res.status(201).send(newThing);
// });
