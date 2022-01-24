module.exports = app => {
  const players = require("../controllers/user.controller.js");
  const gamers = require("../controllers/game.controller.js");
  const gamehistory = require("../controllers/gamehistory.controller.js");

  var router = require("express").Router();

  // Access Endpoints
  router.post("/login", players.login);

  // Player Endpoints
  router.post("/players", players.create);
  router.get("/players", players.findAll);
  router.get("/players/:id", players.findById);
  router.get("/history/:user_id", gamehistory.findAll);
  router.put("/players/:id", players.update);
  router.delete("/players/:id", players.delete);

  // Game  Endpoints
  router.post("/new-game", gamers.create); 
  router.get("/gamers", gamers.findAll);
  router.get("/gamers/:id", gamers.findById);

  // Game Players  Endpoints
  router.post("/score", gamehistory.create);

  // API prefix Dokumentasi
  app.use("/api", router);
};
