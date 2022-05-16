const controllerCtrl = {};

const controller = require('../model/controller');

controllerCtrl.getControllers = async (req,res)=>{
    const controllers = await controller.find();
    res.json(controllers)
}

controllerCtrl.createControllers = async (req,res)=>{
    const {name, port,symbol, indicator, type, ip, remote} = req.body;
    const newcontroller = new controller({
        name, 
         port,
         symbol,
         indicator,
         type,
        ip,
         remote
    })
    await newcontroller.save();
    res.send({message: 'Controlador guardado'})
}

controllerCtrl.getControllerById = async (req,res)=>{
    const c = await controller.find({indicator:req.params.indicator});

    res.send(c)
}

controllerCtrl.updateController = async(req,res)=>{
    const {name, port, indicator, symbol, type, ip, remote} = req.body;
    const action = await controller.updateOne({indicator:req.params.indicator}, {
        name,
        indicator,
        symbol, 
         port,
         type,
        ip,
         remote
    });
    
    if(action.matchedCount === 1)
        res.send({message: 'Controlador modificado'})
    else{
        res.send({message:"No se modificó el controlador"})}
}

controllerCtrl.deleteController = async (req,res)=>{
    const action = await controller.deleteOne({indicator:req.params.indicator});
    if(action.deletedCount===1)
        res.send({message: 'Controlador eliminado'})
    else{
        res.send({message: 'Controlador no eliminado'})
    }
}

module.exports = controllerCtrl;