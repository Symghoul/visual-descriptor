const hostsCtrl = {}

hostsCtrl.gethosts = (req,res)=>{
    res.json({message: 'Funciona en hosts'})
}

hostsCtrl.createhosts = (req,res)=>{
    res.send({message: 'host guardado'})
}

hostsCtrl.gethostById = (req,res)=>{
    res.send({message: 'este es el host '})
}

hostsCtrl.updatehost = (req,res)=>{
    res.send({message: 'host modificado'})
}

hostsCtrl.deletehost = (req,res)=>{
    res.send({message: 'host eliminado'})
}



module.exports =  hostsCtrl;