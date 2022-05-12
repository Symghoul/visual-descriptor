const hostsCtrl = {}

const host = require('../model/hosts');

hostsCtrl.gethosts = async (req,res)=>{
    const hosts = await host.find();
    res.json(hosts)
}

hostsCtrl.createhosts = async (req,res)=>{
    const {name, ip, mask, mac, active} = req.body;
    const newHost = new host({
        name,
        ip,
        mask, 
        mac,
        active
    })
    await newHost.save();
    res.send({message: 'host guardado'})
}

hostsCtrl.gethostById = async (req,res)=>{
    const h = await host.findById(req.params.id);
    
    res.send(h)
}

hostsCtrl.updatehost = async (req,res)=>{
    const {name, ip, mask, mac, active} = req.body;
    await host.findByIdAndUpdate(req.params.id, {
        name,
        ip,
        mask, 
        mac,
        active
    })
    res.send({message: 'host modificado'})
}

hostsCtrl.deletehost = async (req,res)=>{
    await host.findByIdAndDelete(req.params.id);
    res.send({message: 'host eliminado'})
}

module.exports =  hostsCtrl;