var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    gameboard: {type: Array},
    turns: {type: Number}
});

module.exports = mongoose.model("Game", GameSchema);