var Game = require("../models/game");

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const { ObjectID, ObjectId } = require("mongodb");

exports.index = function (req, res, next) {
  Game.findOne({gameId: 1}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
    res.render("index");
  });
};

exports.create = function (req, res, next) {
  sanitizeBody('*').trim().escape();
  var game = new Game({ gameboard: req.body.gameboard, turns: req.body.turns, gameId: 1, gameOver: false, playerTurn: 1, X: req.cookies.playerId });
  //console.log("Cookie: " + req.cookies.playerMark);
  game.save(function (err) {
    if (err) {
      return next(err);
    }
    res.end();
  });
};
/*
exports.addPlayer = function (req, res, next) {
  Game.findOneAndUpdate({gameId: 1, O: { $exists: false }}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
    if (game.) {

    }
    res.end(JSON.stringify(game));
  });
  //sanitizeBody('*').trim().escape();
  var game = new Game({ gameboard: req.body.gameboard, turns: req.body.turns, gameId: 1, gameOver: false, playerTurn: 1, X: req.cookies.playerId });
  //console.log("Cookie: " + req.cookies.playerMark);
  game.save(function (err) {
    if (err) {
      return next(err);
    }
    res.end();
  });
}
*/

exports.update = function (req, res, next) {
  if (req)

  if (req.body.mark === "O") {  
    Game.updateOne({gameId: 1}, {gameboard: req.body.gameboard, turns: req.body.turns, gameOver: req.body.gameOver, winner: req.body.winner, playerTurn: req.body.playerTurn, O: req.cookies.playerId }, function (err) {
      if (err) {
        return next(err);
      }
      console.log("O set");
      res.end();
    });
  } else {
    Game.updateOne({gameId: 1}, {gameboard: req.body.gameboard, turns: req.body.turns, gameOver: req.body.gameOver, winner: req.body.winner, playerTurn: req.body.playerTurn }, function (err) {
      if (err) {
        return next(err);
      }
      console.log("Item updated");
      res.end();
    });
  }
};

exports.delete = function (req, res, next) {

  Game.deleteOne({gameId: 1}, function (err) {
    if (err) {
      return next(err);
    }
    console.log("Item deleted");
    res.end();
  });
};

exports.find = function (req, res, next) {
  Game.findOne({gameId: 1}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
    res.end(JSON.stringify(game));
  });
};

