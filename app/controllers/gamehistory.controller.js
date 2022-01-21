const db = require("../models");
const GamePlay = db.game_histories;
const Players = db.users;
const Gamers = db.gamers;
const Op = db.Sequelize.Op;


// Create new player
exports.create = (req, res) => {

  const game = {
    user_id: req.body.user_id,
    game_id: req.body.game_id,
    result: req.body.result, 
    score: req.body.score,
    game_date: req.body.game_date,
  };

  GamePlay.create(game)
    .then(data => {
      // sokring diplayer
      Players.findByPk(user_id)
      .then(player => {
        let scValue = player.total_score + 1;
        Players.update({ total_score : scValue }, {
          where: { id: user_id }
        })
      });
      
      // sokring diplayer
      Gamers.findByPk(game_id)
      .then(gamers => {
        let pcValue = gamers.play_count + 1;
        Gamers.update({ play_count : pcValue }, {
          where: { id: game_id }
        })
      });

      res.status(201).json({
        result: "SUCCESS",
        message: data
      });
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};

