const linksCtrl = {}

const link = require('../model/link');

linksCtrl.getLinks = async (req,res)=>{
    const links = await link.find();
    res.json(links)
}

linksCtrl.createLink = async (req,res)=>{
    const {name, source, destination, delay, loss, bandwith} = req.body;
    const newlink = new link({
        name,
        source,
        destination,
        delay,
        loss,
        bandwith
    }) 
    await newlink.save();
    res.send({message: 'link guardado'})
}

linksCtrl.getLinkById = async (req,res)=>{
    const l = await link.findById(req.params.id);

    res.send(l)
}

linksCtrl.updateLink = async (req,res)=>{
    const {name, source, destination, delay, loss, bandwith} = req.body;
    await link.findByIdAndUpdate(req.params.id, {
        name,
        source,
        destination,
        delay,
        loss,
        bandwith
    })
    res.send({message: 'links modificado'})
}

linksCtrl.deleteLink = async (req,res)=>{
    await link.findByIdAndDelete(req.params.id);
    res.send({message: 'links eliminado'})
}

module.exports = linksCtrl;