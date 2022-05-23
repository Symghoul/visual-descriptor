const controllerCtrl = {};

const controller = require("../model/controller");

controllerCtrl.getControllers = async (req, res) => {
  const controllers = await controller.find();
  res.json(controllers);
};

controllerCtrl.createControllers = async (req, res) => {
  const { id, name, symbol, ip, port, remote, type, x, y, color } = req.body;
  const newcontroller = new controller({
    indicator: id,
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
  try{
  await newcontroller.save();
  res.send({ message: "Controlador guardado" });
  }
  catch(error){
    res.status(401).send(error);
  }
};

controllerCtrl.getControllerById = async (req, res) => {
  const c = await controller.find({ indicator: req.params.indicator });

  res.send(c);
};

controllerCtrl.updateController = async (req, res) => {
  const { name, symbol, ip, port, remote, type, x, y, color } = req.body;
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
};

controllerCtrl.deleteController = async (req, res) => {
  const action = await controller.deleteOne({
    indicator: req.params.indicator,
  });
  if (action.deletedCount === 1) res.send({ message: "Controlador eliminado" });
  else {
    res.send({ message: "Controlador no eliminado" });
  }
};

module.exports = controllerCtrl;
