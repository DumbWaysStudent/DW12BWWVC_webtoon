require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// controllers
const AuthController = require("./controllers/auth");
const ToonsControllers = require("./controllers/toons");

// midlewares
const { authenticated } = require("./midleware");

// group routes here
app.group("/api/v1", router => {
  // Home page route
  router.get("/", (req, res) => {
    res.send("Hello Webtoon");
  });

  // register & Login API
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);

  // other API goes here
  router.get("/webtoon/:id", ToonsControllers.showid);
  router.get("/webtoon/:toon_id/episodes", ToonsControllers.episode);
  router.get(
    "/webtoon/:toon_id/episode/:eps_id",
    ToonsControllers.detailEpisode
  );

  // Privates API
  // Get Router
  router.get("/webtoons", authenticated, ToonsControllers.show);
  router.get(
    "/user/:user_id/webtoons",
    authenticated,
    ToonsControllers.getCreatedToons
  );
  router.get(
    "/user/:user_id/webtoon/:toon_id/episodes",
    ToonsControllers.showEpsCreatedUser
  );

  // Post Router
  router.post(
    "/user/:user_id/webtoon",
    authenticated,
    ToonsControllers.storeCreatedToons
  );
});

app.listen(port, () => console.log(`Listening on port ${port} !`));
