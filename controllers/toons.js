const models = require("../models");
const Toons = models.webtoons;
const User = models.user;
const Episodes = models.episodes;
const Pages = models.pages;

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

exports.episode = (req, res) => {
  const id = req.params.toon_id;
  Episodes.findAll({
    where: { webtoonsId: id },
    attributes: { exclude: ["id", "webtoonsId"] }
  }).then(data => {
    res.send(data);
  });
};

exports.detailEpisode = (req, res) => {
  const toonsId = req.params.toon_id;
  const epsId = req.params.eps_id;
  console.log(toonsId, epsId);

  Pages.findAll({
    include: [
      {
        model: Episodes,
        as: "myEpisode",
        where: { webtoonsId: toonsId, id: epsId },
        attributes: []
      }
    ],
    attributes: {
      exclude: ["id", "episodesId"]
    }
  }).then(data => {
    res.send(data);
  });
};
