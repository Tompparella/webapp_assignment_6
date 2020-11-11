var express = require("express");
var router = express.Router();
var game_controller = require("../controllers/gameController");

router.get("/", game_controller.index);

module.exports = router;