const switchesCtrl = {};

const switche = require('../model/switch');

switchesCtrl.getSwitches = async (req,res)=>{
    const switches = await switche.find();
    res.json(switche)
}

switchesCtrl.createSwitch = async (req,res)=>{
    const {name,symbol, indicator, controller, mac, protocol, listenPort} = req.body;
    const newSwitch = new switche({
        name, 
        symbol,
        indicator,
        controller,
        mac,
        protocol,
        listenPort
    })
    await newSwitch.save();
    res.send({message: 'switch creado'})
}

switchesCtrl.getSwitchById = async (req,res)=>{
    const s = await switche.find({indicator:req.params.indicator});

    res.send(s)
}

switchesCtrl.updateSwitch = async (req,res)=>{
    const {name, symbol, indicator, controller, mac, protocol, listenPort} = req.body;
    const action = await switche.updateOne({indicator:req.params.indicator}, {
        name, 
        symbol,
        indicator,
        controller,
        mac,
        protocol,
        listenPort
    });
    if(action.matchedCount === 1)
        res.send({message: 'switch modificado'})
    else{
        res.send({message:"No se modificó el switch"})}
}

switchesCtrl.deleteSwitch = async (req,res)=>{
    const action = await switche.deleteOne({indicator:req.params.indicator});
    if(action.deletedCount===1)
        res.send({message: 'switch eliminado'})
    else{
        res.send({message: 'switch no eliminado'})
    }
}

module.exports = switchesCtrl;