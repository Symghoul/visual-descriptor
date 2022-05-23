const {Router} = require('express');
const router = Router();

const {gethosts, createhosts, gethostById, updatehost, deletehost} = require('../controllers/hosts.controller');

router.route('/')
    .get(gethosts)
    .post(createhosts)

router.route('/:indicator')
    .get(gethostById)
    .put(updatehost)
    .delete(deletehost)

module.exports = router;