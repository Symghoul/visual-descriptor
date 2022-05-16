const {Router} = require('express');
const router = Router();

const {getControllers, createControllers, getControllerById, updateController, deleteController} = require('../controllers/ctrl.controller');


router.route('/')
    .get(getControllers)
    .post(createControllers)

router.route('/:indicator')
    .get(getControllerById)
    .put(updateController)
    .delete(deleteController)


module.exports = router;