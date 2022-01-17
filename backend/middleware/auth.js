const jwt = require("jsonwebtoken");

//Verify assigned token
module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("User ID non valable !");
  try {
    const verified = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send({ error: error | "Requête non authentifiée !" });
  }
};
