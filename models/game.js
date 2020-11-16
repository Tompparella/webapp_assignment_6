var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    gameboard: [[String]],
    turns: Number,
    gameId: Number
});

module.exports = mongoose.model("Game", GameSchema);