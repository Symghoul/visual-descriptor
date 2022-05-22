const {Router} = require("express");
const router = Router();

const {mask, newIp, newMac} = require("../controllers/services.controller");

/*router.route("/mask")
    .post(mask);
*/
router.route("/ip")
    .post(newIp);

router.route("/mac")
    .post(newMac);

module.exports = router;