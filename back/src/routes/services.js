const { Router } = require("express");
const router = Router();

const { 
    dhcp, 
    macAllowed 
} = require("../controllers/services.controller");

router.route("/ip").post(dhcp);

router.route("/mac").post(macAllowed);

module.exports = router;
