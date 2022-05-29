const controllerCtrl = {};

const controller = require("../model/controller");

controllerCtrl.getControllers = async (req, res) => {
  try {
    const controllers = await controller.find();
    res.json(controllers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

controllerCtrl.createControllers = async (req, res) => {
  const { indicator, name, symbol, ip, port, remote, type, x, y, color } =
    req.body;
  const newcontroller = new controller({
    indicator,
    name,
    symbol,
    ip,
    port,
    remote,
    type,
    x,
    y,
    color,
  });
  try {
    await newcontroller.save();
    res.send({ message: "Controlador guardado" });
  } catch (error) {
    if (error.keyValue.ip) res.status(401).send(error);
    else {
      res.send(error);
    }
  }
};

controllerCtrl.getControllerById = async (req, res) => {
  try {
    const c = await controller.find({ indicator: req.params.indicator });

    res.send(c);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

controllerCtrl.updateController = async (req, res) => {
  try {
    const { name, symbol, ip, port, remote, type, x, y, color } = req.body;
    const objOnDB = await controller.find({ ip: `${req.body.ip}` });
    if (objOnDB.indicator != undefined) {
      if (objOnDB.indicator !== req.params.indicator) {
        res.status(401).send({ message: "Use another IP" });
        return;
      }
    }
    const action = await controller.updateOne(
      { indicator: req.params.indicator },
      {
        name,
        symbol,
        ip,
        port,
        remote,
        type,
        x,
        y,
        color,
      }
    );

    if (action.matchedCount === 1)
      res.send({ message: "Controlador modificado" });
    else {
      res.send({ message: "No se modificó el controlador" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

controllerCtrl.deleteController = async (req, res) => {
  try {
    const action = await controller.deleteOne({
      indicator: req.params.indicator,
    });
    if (action.deletedCount === 1)
      res.send({ message: "Controlador eliminado" });
    else {
      res.send({ message: "Controlador no eliminado" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = controllerCtrl;
