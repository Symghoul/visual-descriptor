const {Router} = require('express');
const router = Router();

const {getScript} = require('../controllers/general.controller');


router.route('/:nameArchive').get(getScript)

module.exports = router;