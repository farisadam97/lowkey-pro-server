module.exports = (sequelize, Sequelize) => {
  const GameHistory = sequelize.define("game_histories", {
    user_id: {
      type: Sequelize.STRING
    },
    game_id: {
      type: Sequelize.STRING
    },
    result: {
      type: Sequelize.STRING
    },
    score: {
      type: Sequelize.INTEGER
    },
    game_date: {
      type: Sequelize.DATE
    }
   
  });

  return GameHistory;
};
