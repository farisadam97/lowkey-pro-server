const db = require("../models");
const Game = db.gamers;
const Op = db.Sequelize.Op;


// Create new player
exports.create = (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.thumbnail_url || !req.body.game_url ) {
    res.status(400).json({
      result: "FAILED",
      message: "name or description or thumbnail_url or game_url field cannot be empty."
    });
    return;
  }

  const game = {
    name: req.body.name,
    description: req.body.description,
    thumbnail_url: req.body.thumbnail_url, 
    game_url: req.body.game_url,
  };

  Game.create(game)
    .then(data => {
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

// get all players (with query parameters)
exports.findAll = (req, res) => {
  let conditions = []
  if (req.query.name) {
    conditions.push({ name : req.query.name});
  }
  if (req.query.description) {
    conditions.push({ description : req.query.description });
  }
  if (req.query.thumbnail_url) {
    conditions.push({ thumbnail_url : req.query.thumbnail_url });
  }
  if (req.query.game_url) {
    conditions.push({ game_url : req.query.game_url });
  }

  Game.findAll({ 
    where: {
      [Op.and] : conditions
    } 
    })
    .then(data => {
      res.status(200).json({
        result: "SUCCESS",
        message: data
      });
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    });
};

// Find a Detail Game with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  Game.findByPk(id)
    .then(data => {
      res.status(200).json({
        result: "SUCCESS",
        message: data
      });
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message: "Error retrieving Player with id=" + id
      });
    });
};
/* Player.update({ experience : expValue, lvl : lvlValue }, {
  where: { id: id }
}) 

Player.update(req.body, {
    where: { id: id }
  })
*/
