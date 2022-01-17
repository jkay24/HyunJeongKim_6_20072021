const jwt = require("jsonwebtoken");
require("dotenv").config();

//Verify assigned token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(" ")[1];
    const verified = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = verified.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
