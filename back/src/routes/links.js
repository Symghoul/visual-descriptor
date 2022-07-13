const {Router} = require('express');
const router = Router();

const {
    getLinks, 
    createLink, 
    getLinkById, 
    updateLink, 
    deleteLink
} = require('../controllers/links.controller')

router.route('/')
    .get(getLinks)
    .post(createLink);

router.route('/:indicator')
    .get(getLinkById)
    .put(updateLink)
    .delete(deleteLink);

module.exports = router;