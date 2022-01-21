module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    total_score: {
      type: Sequelize.INTEGER
    },
    bio: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    social_media_url: {
      type: Sequelize.STRING
    }
  });

  return User;
};
