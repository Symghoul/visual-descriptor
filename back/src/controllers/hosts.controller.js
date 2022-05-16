const hostsCtrl = {}

const host = require('../model/hosts');

hostsCtrl.gethosts = async (req,res)=>{
    const hosts = await host.find();
    res.json(hosts)
}

hostsCtrl.createhosts = async (req,res)=>{
    const {name, symbol, indicator, ip, mask, mac, active} = req.body;
    const newHost = new host({
        name,
        symbol,
        indicator,
        ip,
        mask, 
        mac,
        active
    })
    await newHost.save();
    res.send({message: 'host guardado'})
}

hostsCtrl.gethostById = async (req,res)=>{
    const h = await host.find({indicator:req.params.indicator});
    
    res.send(h)
}

hostsCtrl.updatehost = async (req,res)=>{
    const {name, ip, indicator, symbol, mask, mac, active} = req.body;
    const action = await host.updateOne({indicator:req.params.indicator}, {
        name,
        ip,
        indicator,
        symbol,
        mask, 
        mac,
        active
    })
    if(action.matchedCount === 1)
        res.send({message: 'host modificado'})
    else{
        res.send({message:"No se modificó el host"})}
    
}

hostsCtrl.deletehost = async (req,res)=>{
    const action = await host.deleteOne({indicator:req.params.indicator});
    if(action.deletedCount===1)
        res.send({message: 'host eliminado'})
    else{
        res.send({message: 'host no eliminado'})
    }
    
}

module.exports =  hostsCtrl;