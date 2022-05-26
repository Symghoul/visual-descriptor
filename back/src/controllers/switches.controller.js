const switchesCtrl = {};

const switche = require("../model/switch");

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
    res.send({ message: "switch creado" });
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
    if (action.matchedCount === 1) res.send({ message: "switch modificado" });
    else {
      res.send({ message: "No se modificó el switch" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

switchesCtrl.deleteSwitch = async (req, res) => {
  try {
    const action = await switche.deleteOne({ indicator: req.params.indicator });
    if (action.deletedCount === 1) res.send({ message: "switch eliminado" });
    else {
      res.send({ message: "switch no eliminado" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = switchesCtrl;
