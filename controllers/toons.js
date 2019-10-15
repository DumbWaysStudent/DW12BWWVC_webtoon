const models = require("../models");
const Toons = models.webtoons;
const User = models.user;

exports.show = (req, res) => {
  let query;

  if (req.query.title) {
    query = Toons.findAll({
      where: {
        title: req.query.title
      },
      include: {
        model: User,
        as: "created_by"
      }
    });
  } else if (req.params.id) {
    query = Toons.findAll({
      where: {
        title: req.query.id
      },
      include: {
        model: User,
        as: "created_by"
      }
    });
  } else {
    query = Toons.findAll({
      include: {
        model: User,
        as: "created_by"
      }
    });
  }
  console.log(query);
  query.then(data => res.send(data));
};

exports.showid = (req, res) => {
  Toons.findOne({ where: { id: req.params.id } }).then(data => res.send(data));
};
