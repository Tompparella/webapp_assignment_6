var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    gameboard: [[String]],
    turns: Number,
    gameId: Number,
    gameOver: Boolean,
    winner: String,
    playerTurn: Number,
    X: String,
    O: String
});

module.exports = mongoose.model("Game", GameSchema);