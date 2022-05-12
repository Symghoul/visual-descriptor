const switchesCtrl = {};

const switche = require('../model/switch');

switchesCtrl.getSwitches = async (req,res)=>{
    const switches = await switche.find();
    res.json(switche)
}

switchesCtrl.createSwitch = async (req,res)=>{
    const {name, controller, mac, protocol, listenPort} = req.body;
    const newSwitch = new switche({
        name, 
        controller,
        mac,
        protocol,
        listenPort
    })
    await newSwitch.save();
    res.send({message: 'switch creado'})
}

switchesCtrl.getSwitchById = async (req,res)=>{
    const s = await switche.findById(req.params.id);

    res.send(s)
}

switchesCtrl.updateSwitch = async (req,res)=>{
    const {name, controller, mac, protocol, listenPort} = req.body;
    await switche.findByIdAndUpdate(req.body.id, {
        name, 
        controller,
        mac,
        protocol,
        listenPort
    });
    res.send({message: 'switch modificado'})
}

switchesCtrl.deleteSwitch = async (req,res)=>{
    await switche.findByIdAndDelete(req.params.id);
    res.send({message: 'switch eliminado'})
}

module.exports = switchesCtrl;