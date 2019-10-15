const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.user;
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email } }).then(user => {
    const authorization = bcrypt.compareSync(password, user.password);
    if (authorization) {
      const token = jwt.sign({ id: user.id }, "my-secret-key");
      res.send({
        login: "Succesfull",
        token
      });
    } else {
      res.send({
        error: true,
        message: "Wrong Email or Password Invalid !"
      });
    }
  });
};

// exports.register = (req, res) => {
//   const hashedPassword = bcrypt.hashSync(req.body.password, 8);
//   User.create({
//     email: req.body.email,
//     password: hashedPassword
//   }).then(user => {
//     if (user) {
//       const token = jwt.sign({ id: user.id }, "my-secret-key");
//       res.send({
//         status: "true",
//         token
//       });
//     }
//   });
// };
