const express = require("express");
const morgan = require("morgan");
const serverPort = 5000;

// init the express app
const app = express();

// convert body to json
app.use(express.json());
app.use(morgan("dev"));

// define the index route
app.get("/", (req, res) => {
  console.log("A new request just hit the API !");
  res.send("Hello dear API client :)");
});

const things = [
  { id: 1, name: "Socks" },
  { id: 2, name: "Computer" },
  { id: 3, name: "Passion" },
];

app.get("/things", (req, res) => {
  res.send(things);
});

app.get("/things/:id", (req, res) => {
  const parsedThingId = parseInt(req.params.id);
  const thing = things.find((thing) => thing.id === parsedThingId);
  if (thing) {
    res.send(thing);
  } else {
    res.sendStatus(404);
  }
});

let newId = 4;

app.post("/things", (req, res) => {
  const { name } = req.body;
  const newThing = { id: newId++, name };
  things.push(newThing);
  res.status(201).send(newThing);
});

// listen to incoming requests
app.listen(serverPort, () => console.log("Express server is running"));
