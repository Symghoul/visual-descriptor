const linksCtrl = {}

linksCtrl.getLinks = (req,res)=>{
    res.json({message: 'Funciona en links'})
}

linksCtrl.createLink = (req,res)=>{
    res.send({message: 'Controlador links'})
}

linksCtrl.getLinkById = (req,res)=>{
    res.send({message: 'este es el links '})
}

linksCtrl.updateLink = (req,res)=>{
    res.send({message: 'links modificado'})
}

linksCtrl.deleteLink = (req,res)=>{
    res.send({message: 'links eliminado'})
}

module.exports = linksCtrl;