const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ you: "can't touch this" });
      } else {
        req.user = { department: decodedToken.department };
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
