const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express")
const swaggerJSON = require('./docs/swagger.json')
const app = express();

var corsOptions = {
    origin: "https://lowkey-pro-backend.herokuapp.com"
};

app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));
// accept request in form or JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./app/models");
db.client.sync();

require("./app/routes/player.routes")(app);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = {app}