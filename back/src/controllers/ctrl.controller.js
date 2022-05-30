const controllerCtrl = {};

const controller = require("../model/controller");

//Es requerido para acceder a su base de datos netamente para validar
const host = require("../model/hosts");

let ipErr = "ip repeated with a host"

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
    res.send({ message: "Controller saved" });
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
    await validateIp(ip);

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
      res.send({ message: "Controller modified" });
    else {
      res.send({ message: "Controller does not modified" });
    }
  } catch (error) {
    if(error.keyValue){
      res.status(401).send(error.message);}
    else{
      if(error.message === ipErr){
        res.status(403).send(error);
      }else{
      res.status(500).send(error.message);}
    }
  }
};

controllerCtrl.deleteController = async (req, res) => {
  try {
    const action = await controller.deleteOne({
      indicator: req.params.indicator,
    });
    if (action.deletedCount === 1)
      res.send({ message: "Controller deleted" });
    else {
      res.send({ message: "Controller does not deleted" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

async function validateIp(ip){
  
  const objOnDB = await host.find({ip:`${ip}`}).exec();

  if(objOnDB.length > 0){
      throw new Error(ipErr);
  }
  return;
}


module.exports = controllerCtrl;
