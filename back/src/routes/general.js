const { Router } = require("express");
const router = Router();

const {
  eraseDB,
  getScript,
  load,
  execMininet,

} = require("../controllers/general.controller");

router.route("/erase")
  .get(eraseDB);

router.route("/getScript/:nameArchive")
  .get(getScript);

router.route("/load")
  .post(load);
  
router.route("/execMininet/:nameArchive")
  .get(execMininet)

module.exports = router;
