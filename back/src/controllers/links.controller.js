const linksCtrl = {};

const link = require("../model/link");

linksCtrl.getLinks = async (req, res) => {
  try {
    const links = await link.find();
    res.json(links);
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

linksCtrl.createLink = async (req, res) => {
  const {
    id,
    delay,
    loss,
    bandwidth,
    from,
    to,
    source,
    destination,
    type,
    color,
  } = req.body;
  const newlink = new link({
    indicator: id,
    delay,
    loss,
    bandwidth,
    from,
    to,
    source,
    destination,
    type,
    color,
  });
  try {
    await newlink.save();
    res.send({ message: "link guardado" });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

linksCtrl.getLinkById = async (req, res) => {
  try {
    const l = await link.find({ indicator: req.params.indicator });
    res.send(l);
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

linksCtrl.updateLink = async (req, res) => {
  const {
    id,
    delay,
    loss,
    bandwidth,
    from,
    to,
    source,
    destination,
    type,
    color,
  } = req.body;
  try {
    const action = await link.updateOne(
      { indicator: req.params.indicator },
      {
        delay,
        loss,
        bandwidth,
        from,
        to,
        source,
        destination,
        type,
        color,
      }
    );
    if (action.matchedCount === 1) res.send({ message: "link modificado" });
    else {
      res.send({ message: "link no modificado" });
    }
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

linksCtrl.deleteLink = async (req, res) => {
  try {
    const action = await link.deleteOne({ indicator: req.params.indicator });
    if (action.deletedCount === 1) res.send({ message: "link eliminado" });
    else {
      res.send({ message: "link no eliminado" });
    }
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = linksCtrl;
