const { Router } = require("express");
const router = Router();

const {
  eraseDB,
  getScript,
  load,
} = require("../controllers/general.controller");

router.route("/erase")
  .get(eraseDB);

router.route("/export/:nameArchive")
  .get(getScript);

router.route("/load")
  .post(load);

module.exports = router;
