const {Router} = require("express");
const router = Router();

const {newIp, newMac} = require("../controllers/services.controller");

router.route("/ip")
    .post(newIp);

router.route("/mac")
    .post(newMac);

module.exports = router;