require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// controllers
const AuthController = require("./controllers/auth");

// midlewares
const { authenticated } = require("./midleware");

// group routes here
app.group("/api/v1", router => {
  // create the homepage route
  router.get("/", (req, res) => {
    res.send("Hello Webtoon");
  });

  // auth API
  router.post("/login", AuthController.login);

  // register API
  // router.post("/register", AuthController.register);
});

app.listen(port, () => console.log(`Listening on port ${port} !`));
