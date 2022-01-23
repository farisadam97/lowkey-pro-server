require('dotenv').config()
const db = require("../models");
const Player = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.APP_SECRET , { expiresIn: "7 days" });
};

//Login
exports.login = async (req, res) => {
    if (!req.body.username || !req.body.password ) {
        res.status(400).json({
          result: "FAILED",
          message: "name or username or email or password field cannot be empty."
        });
        return;
    }

    await Player.findOne({
      where : { username: req.body.username }
    })

    .then( async data => {
      
      // const isMatch = await bcrypt.compare(req.body.password, data.password)
      const matchPassword = (req.body.password === data.password) ? "True" : "False" 

      // if (!isMatch) {
      //   throw {
      //       message: `invalid password`,
      //       code: 404,
      //       error: `bad request`,
      //   }
      // }

      const dataExist = {
        id: data.id,
        name: data.name,
        email: data.email,
        total_score: data.total_score,
        bio: data.bio, 
        city: data.city, 
        social_media_url: data.social_media_url, 
        
      };
    
      const dataToken = await createToken(dataExist.id);

      res.status(200).json({
        RespCode: "00",
        result: "SUCCESS",
        id: dataExist.id,
        name: dataExist.name,
        email: dataExist.email,
        total_score: dataExist.total_score,
        bio: dataExist.bio,
        city: dataExist.city,
        social_media_url: dataExist.social_media_url,
        token: dataToken
      });
      
    })
    .catch(err => {
      console.log(err)
      
      return res.status(404).json({
        result:"FAILED",
        message :" data not found"
    })
    })
/* 
    const loginUser =  async (req,res,next) => {
      try {
          const username = req.body.username
          const password = req.body.password
  
          const userExist  = await Player.findOne({
              where : {
                username,
              },
          })
  
          if(!userExist){
              throw {
                  message : "username not found ",
                  code : "404",
                  error : "bad request"
              }
          }
  
         */
  
         /*  jwtUser = await createToken(userExist.id)
          console.log(jwtUser) */
         /*  const data = {
            id: userExist.id,
            name: userExist.name,
            username: userExist.username,
            email: userExist.email,
            password: userExist.password, 
            total_score: userExist.total_score,
            bio: userExist.bio, 
            city: userExist.city, 
            social_media_url: userExist.social_media_url, 
            
          };

          console.log(data)

          res.status(200).json({
            result: "SUCCESS",
            message: data
          });
          
  
          
      } catch (error) {    
      }
    } */
}

// Create new player
exports.create = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({
      result: "FAILED",
      message: "name or username or email or password field cannot be empty."
    });
    
  }

/* 
  await Player.findAll({ 
    where: { name: req.body.name }
    })
    .then(data => {
      return res.status(400).json({
        result: "FAILED",
        message: "name already exist"
      });
      
    })
   
*/
  await Player.findOne({ 
    where: { username: req.body.username }
    })
    .then(data => {
      return res.status(400).json({
        result: "FAILED",
        message: "username already exist "
      });
      
    }) 
    .catch(err  => {
      console.log(err);
    })
 /*  Player.findAll({ 
    where: { email: req.body.email }
    })
    .then(data => {
      return res.status(400).json({
        result: "FAILED",
        message: "email already exist"
      });
      
    }) */
     
  
  const player = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password, 
    total_score:0,
    bio: req.body.bio, 
    city: req.body.city, 
    social_media_url: req.body.social_media_url, 
    
  };

  Player.create(player)
    .then(data => {
      res.status(200).json({
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
  if (req.query.username) {
    conditions.push({ username : req.query.username});
  }
  if (req.query.email) {
    conditions.push({ email : req.query.email });
  }
  if (req.query.bio) {
    conditions.push({ bio : req.query.bio });
  }
  if (req.query.social_media_url) {
    conditions.push({ social_media_url : req.query.social_media_url });
  }
  if (req.query.city) {
    conditions.push({ city : req.query.city });
  }

  Player.findAll({ 
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

// Find a single Player with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  Player.findByPk(id)
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

// Update a Player by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body)
  Player.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          result: "SUCCESS",
          message: "Player was updated successfully."
        });
      } else {
        res.status(400).json({
          result: "FAILED",
          message: `Cannot update Player with id=${id}. Maybe Player was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message: "Error updating Player with id=" + id
      });
    });
};

// Delete a Player with id
exports.delete = (req, res) => {
  const id = req.params.id;

  Player.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          result: "SUCCESS",
          message: "Player was deleted successfully!"
        });
      } else {
        res.status(400).json({
          result: "FAILED",
          message: `Cannot delete Player with id=${id}. Maybe Player was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message: "Could not delete Player with id=" + id
      });
    });
};
