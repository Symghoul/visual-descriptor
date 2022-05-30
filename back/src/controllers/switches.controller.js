const switchesCtrl = {};

const switche = require("../model/switch");
const macErr = "Mac repeated with a host";

//es requerido para acceder a su base de datos netamente para validar
const host = require("../model/hosts");

switchesCtrl.getSwitches = async (req, res) => {
  try {
    const switches = await switche.find();

    res.json(switches);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

switchesCtrl.createSwitch = async (req, res) => {
  const {
    indicator,
    name,
    symbol,
    protocol,
    port,
    mac,
    controller,
    type,
    x,
    y,
    color,
  } = req.body;
  const newSwitch = new switche({
    indicator,
    name,
    symbol,
    protocol,
    port,
    controller,
    mac,
    type,
    x,
    y,
    color,
  });
  try {
    await newSwitch.save();
    res.send({ message: "switch saved" });
  } catch (error) {
    if (error) res.status(402).send(error);
  }
};

switchesCtrl.getSwitchById = async (req, res) => {
  try {
    const s = await switche.find({ indicator: req.params.indicator });

    res.send(s);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

switchesCtrl.updateSwitch = async (req, res) => {
  try {
    const { name, symbol, protocol, port, mac, controller, type, x, y, color } =
      req.body;
    await validateMac(mac);
    const action = await switche.updateOne(
      { indicator: req.params.indicator },
      {
        name,
        symbol,
        protocol,
        port,
        controller,
        mac,
        type,
        x,
        y,
        color,
      }
    );
    if (action.matchedCount === 1) res.send({ message: "switch modified" });
    else {
      res.send({ message: "Switch does not modified" });
    }
  } catch (error) {
    if(error.keyValue){
      res.status(402).send(error);
    }else{ 
      if(error.message === macErr){
        res.status(405).send(error);
      }
      else{
        res.status(500).send(error.message);
      }
    }
  }
};

switchesCtrl.deleteSwitch = async (req, res) => {
  try {
    const action = await switche.deleteOne({ indicator: req.params.indicator });
    if (action.deletedCount === 1) res.send({ message: "switch deleted" });
    else {
      res.send({ message: "switch does not deleted" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

async function validateMac(mac){
  const objOnDB = await host.find({ mac: `${mac}` });

  if(objOnDB.length > 0){
      throw new Error(macErr);
  }
  return;
}

module.exports = switchesCtrl;
