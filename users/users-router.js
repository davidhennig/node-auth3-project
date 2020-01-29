const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, onlyDepartment("web25"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function onlyDepartment(department) {
  return function(req, res, next) {
    if (
      req.user &&
      req.user.department &&
      req.user.department.toLowerCase() === department
    ) {
      next();
    } else {
      res.status(403).json({ message: "403 message" });
    }
  };
}

module.exports = router;
