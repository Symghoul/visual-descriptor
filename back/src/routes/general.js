const {Router} = require('express');
const router = Router();

const {eraseDB, getScript} = require('../controllers/general.controller');


router.route('/erase')
    .get(eraseDB);

router.route('/:nameArchive')
    .get(getScript);



module.exports = router;