module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("gamers", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    thumbnail_url: {
      type: Sequelize.STRING
    },
    game_url: {
      type: Sequelize.STRING
    },
    play_count: {
      type: Sequelize.INTEGER
    }
  });

  return Game;
};
