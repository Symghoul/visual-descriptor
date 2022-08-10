const {Router} = require('express');
const router = Router();

const {
    getSwitches, 
    createSwitch, 
    getSwitchById, 
    updateSwitch, 
    deleteSwitch
} = require('../controllers/switches.controller')

router.route('/')
    .get(getSwitches)
    .post(createSwitch);

router.route('/:indicator')
    .get(getSwitchById)
    .put(updateSwitch)
    .delete(deleteSwitch);

module.exports = router;