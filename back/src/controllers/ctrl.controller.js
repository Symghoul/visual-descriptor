const controllerCtrl = {};

const controller = require('../model/controller');

controllerCtrl.getControllers = async (req,res)=>{
    const controllers = await controller.find();
    res.json(controllers)
}

controllerCtrl.createControllers = async (req,res)=>{
    const {name, port, type, ip, remote} = req.body;
    const newcontroller = new controller({
        name, 
         port,
         type,
        ip,
         remote
    })
    await newcontroller.save();
    res.send({message: 'Controlador guardado'})
}

controllerCtrl.getControllerById = async (req,res)=>{
    const c = await controller.findById(req.params.id);

    res.send(c)
}

controllerCtrl.updateController = async(req,res)=>{
    const {name, port, type, ip, remote} = req.body;
    await controller.findByIdAndUpdate(req.params.id, {
        name, 
         port,
         type,
        ip,
         remote
    });
    res.send({message: 'Controlador modificado'})
}

controllerCtrl.deleteController = async (req,res)=>{
    await controller.findByIdAndDelete(req.params.id);
    res.send({message: 'Controlador eliminado'})
}

module.exports = controllerCtrl;