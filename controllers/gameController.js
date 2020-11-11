var Game = require("../models/game");

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

exports.index = function (req, res, next) {
  Game.findOne({}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
    res.render("index");
  });
};

exports.create = function (req, res, next) {
  var game = new Game({ gameboard: req.body.gameboard, turns: req.body.turns });

  game.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/index");
  });
};

exports.find = function (req, res, next) {
  Game.findOne({}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
    console.log(game);
    res.end(JSON.stringify(game));
  });
};
