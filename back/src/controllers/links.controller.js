const linksCtrl = {}

const link = require('../model/link');

linksCtrl.getLinks = async (req,res)=>{
    const links = await link.find();
    res.json(links)
}

linksCtrl.createLink = async (req,res)=>{
    const {name, source,indicator, symbol, destination, delay, loss, bandwith} = req.body;
    const newlink = new link({
        name,
        source,
        indicator,
        symbol,
        destination,
        delay,
        loss,
        bandwith
    }) 
    await newlink.save();
    res.send({message: 'link guardado'})
}

linksCtrl.getLinkById = async (req,res)=>{
    const l = await link.find({indicator:req.params.indicator});

    res.send(l)
}

linksCtrl.updateLink = async (req,res)=>{
    const {name, source,symbol, indicator, destination, delay, loss, bandwith} = req.body;
    const action = await link.updateOne({indicator:req.params.indicator}, {
        name,
        source,
        symbol,
        indicator,
        destination,
        delay,
        loss,
        bandwith
    })
    if(action.matchedCount === 1)
        res.send({message: 'link modificado'})
    else{
        res.send({message: 'link no modificado'})}
}

linksCtrl.deleteLink = async (req,res)=>{
    const action = await link.deleteOne({indicator:req.params.indicator});
    if(action.deletedCount===1)
        res.send({message: 'link eliminado'})
    else{
        res.send({message: 'link no eliminado'})
    }
}

module.exports = linksCtrl;