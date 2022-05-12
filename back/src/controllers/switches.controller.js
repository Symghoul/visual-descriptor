const switchesCtrl = {}

switchesCtrl.getSwitches = (req,res)=>{
    res.json({message: 'Funciona en switches'})
}

switchesCtrl.createSwitch = (req,res)=>{
    res.send({message: 'Controlador switches'})
}

switchesCtrl.getSwitchById = (req,res)=>{
    res.send({message: 'este es el switches '})
}

switchesCtrl.updateSwitch = (req,res)=>{
    res.send({message: 'switches modificado'})
}

switchesCtrl.deleteSwitch = (req,res)=>{
    res.send({message: 'switches eliminado'})
}


module.exports = switchesCtrl;