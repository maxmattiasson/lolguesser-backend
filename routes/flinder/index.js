const express = require("express");
const router = express.Router();

router.use("/genres", require("./genres"));
router.use("/movies", require("./movies"));
router.use("/topRated", require("./topRated"));
router.use("/movieDetails", require("./movieDetails"));
router.use("/movieFull", require("./movieFull"));

module.exports = router;
