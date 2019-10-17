const models = require("../models");
const Toons = models.webtoons;
const User = models.user;
const Episodes = models.episodes;
const Pages = models.pages;

// get all webtoons
const getToons = data => {
  const newData = data.map(item => {
    let newItem = {
      title: item.title,
      genre: item.genre,
      isFavorite: item.isFavorite,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.createdAt,
      createdBy: item.createdBy.id
    };
    return newItem;
  });
  return newData;
};

// get all webtoons favorite
const getFavorite = data => {
  const input = data.filter(item => item.isFavorite);

  let newData = input.map(item => {
    let newItem = {
      title: item.title,
      genre: item.genre,
      isFavorite: item.isFavorite,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newItem;
  });
  return newData;
};

// get all toons by title
const getToonsByTitle = (data, title) => {
  const input = data.filter(item => {
    return item.title.toLowerCase().includes(title.toLowerCase());
  });
  let newData = input.map(item => {
    let newItem = {
      title: item.title,
      genre: item.genre,
      isFavorite: item.isFavorite,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      createdBy: item.createdBy.id
    };
    return newItem;
  });
  return newData;
};

exports.show = (req, res) => {
  Toons.findAll({
    include: {
      model: User,
      as: "created_by"
    }
  }).then(data => {
    let newData;

    if (req.query.isFavorite == "true") {
      newData = getFavorite(data);
    } else if (req.query.title) {
      newData = getToonsByTitle(data, req.query.title);
    } else {
      newData = getToons(data);
    }
    res.send(newData);
  });
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

exports.getCreatedToons = (req, res) => {
  const user_id = req.params.user_id;

  Toons.findAll({
    where: { createdBy: user_id },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }).then(data => res.send(data));
};

exports.storeCreatedToons = (req, res) => {
  const user_id = req.params.user_id;

  Toons.create({
    title: req.body.title,
    genre: req.body.genre,
    isFavorite: false,
    image: req.body.image,
    createdBy: user_id
  }).then(data => res.send(data));
};

exports.showEpsCreatedUser = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;

  Episodes.findAll({
    include: [
      {
        model: Toons,
        as: "toonId",
        where: { createdBy: userId, id: toonId },
        attributes: {
          exclude: ["id", "isFavorite", "image", "createdAt", "updatedAt"]
        }
      }
    ],
    attributes: { exclude: ["id", "webtoonsId"] }
  }).then(data => {
    res.send(data);
  });
};

exports.updateMyToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;

  Toons.update(
    {
      title: req.body.title,
      genre: req.body.genre,
      image: req.body.image
    },
    {
      where: { createdBy: userId, id: toonId }
    }
  ).then(data => {
    res.send({
      status: "succes",
      Message: "Data Has been Updated"
    });
  });
};

exports.deleteMyToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  Toons.destroy({
    where: { createdBy: userId, id: toonId }
  })
    .then(data => {
      res.send({
        delete: "succes"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.createEpsToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;

  Episodes.findAll({
    include: [
      {
        model: Toons,
        as: "toonId",
        where: { createdBy: userId, id: toonId },
        attributes: []
      }
    ]
  }).then(items => {
    Episodes.create({
      webtoonsId: toonId,
      episode: req.body.episode,
      image: req.body.image
    }).then(data => {
      res.send(data);
    });
  });
};

exports.showImgEPs = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;

  Pages.findAll({
    include: [
      {
        model: Episodes,
        as: "myEpisode",
        where: { webtoonsId: toonId, id: epsId },
        attributes: [],
        include: [
          {
            model: Toons,
            as: "toonId",
            where: { createdBy: userId, id: toonId },
            attributes: []
          }
        ]
      }
    ],
    attributes: ["image"]
  }).then(data => {
    res.send(data);
  });
};

exports.updateMyEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;

  Toons.findAll({
    where: { createdBy: userId, id: toonId }
  })
    .then(data => {
      Episodes.update(
        {
          episode: req.body.episode,
          image: req.body.image
        },
        {
          where: { webtoonsId: toonId, id: epsId }
        }
      ).then(data => {
        res.send({
          Message: "Update Succesfull !!"
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteMyEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;

  Toons.findAll({
    where: { createdBy: userId, id: toonId }
  }).then(data => {
    Episodes.destroy({
      where: { webtoonsId: toonId, id: epsId }
    }).then(deleted => {
      res.send({
        Message: "delete succesfull"
      });
    });
  });
};

exports.createImgEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;

  Pages.findAll({
    include: [
      {
        model: Episodes,
        as: "myEpisode",
        where: { webtoonsId: toonId, id: epsId },
        attributes: [],
        include: [
          {
            model: Toons,
            as: "toonId",
            where: { createdBy: userId, id: toonId }
          }
        ]
      }
    ]
  }).then(items => {
    if (items.length > 0 && req.body.episodesId == epsId) {
      Pages.create({
        episodesId: req.body.episodesId,
        page: req.body.page,
        image: req.body.image
      }).then(data => {
        res.send(data);
      });
    } else {
      res.send({
        Message: "Error request !!"
      });
    }
  });
};

exports.deleteImgEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;
  const imgId = req.params.img_id;

  Pages.findAll({
    include: [
      {
        model: Episodes,
        as: "myEpisode",
        where: { webtoonsId: toonId, id: epsId },
        attributes: [],
        include: [
          {
            model: Toons,
            as: "toonId",
            where: { createdBy: userId, id: toonId },
            attributes: []
          }
        ]
      }
    ]
  }).then(items => {
    if (items.length > 0) {
      Pages.destroy({
        where: { episodesId: epsId, id: imgId }
      }).then(deleted => {
        res.send({
          Message: "Delete Succesfull !!"
        });
      });
    }
  });
};
