const controllerCtrl = {};

controllerCtrl.getControllers = (req,res)=>{
    res.json({message: 'Funciona en controllers'})
}

controllerCtrl.createControllers = (req,res)=>{
    res.send({message: 'Controlador guardado'})
}

controllerCtrl.getControllerById = (req,res)=>{
    res.send({message: 'este es el controlador '})
}

controllerCtrl.updateController = (req,res)=>{
    res.send({message: 'Controlador modificado'})
}

controllerCtrl.deleteController = (req,res)=>{
    res.send({message: 'Controlador eliminado'})
}

module.exports = controllerCtrl;