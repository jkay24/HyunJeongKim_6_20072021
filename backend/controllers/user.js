const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const passwordSchema = require("../models/password");
const maskData = require("maskdata");

//SINGUP FUNCTION
exports.signup = (req, res, next) => {
  //Validate pw before making new user
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Veuillez saisir un mot de passe avec au moins 8 caractères, comprenant une lettre maj, une min et un chiffre.",
    });
  } else {
    next();
  }
  // const maskedEmail = @how to do this?!
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//LOGIN FUNCTION
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    //Check if user (email used with signup) exists
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //Check if pw correct
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //Create and assign a token
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.RANDOM_TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
