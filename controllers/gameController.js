var Game = require("../models/game");

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const { ObjectID, ObjectId } = require("mongodb");


exports.index = function (req, res, next) {
  Game.findOne({}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
    res.render("index");
  });
};

exports.create = function (req, res, next) {
  sanitizeBody('*').trim().escape();
  var game = new Game({ gameboard: req.body.gameboard, turns: req.body.turns });
  console.log(req.body);
  game.save(function (err) {
    if (err) {
      return next(err);
    }
    res.end();
  });
};

exports.update = function (req, res, next) {
  var game = new Game({ gameboard: req.body.gameboard, turns: req.body.turns });
  var id = ObjectId(req.body.id);

  Game.updateOne({"_id": id}, {$set: game}, function (err) {
    if (err) {
      return next(err);
    }
    console.log("Item updated");
    res.redirect("/");
  });
};

exports.delete = function (req, res, next) {
  var id = ObjectId(req.body.id);

  Game.deleteOne({"_id": id}, function (err) {
    if (err) {
      return next(err);
    }
    console.log("Item deleted");
    res.end();
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

