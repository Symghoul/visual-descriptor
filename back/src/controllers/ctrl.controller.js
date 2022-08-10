const controllerCtrl = {};

const controller = require("../model/controller");
const hosts = require("../model/hosts");

//Es requerido para acceder a su base de datos netamente para validar
const host = require("../model/hosts");

let ipErr = "ip repeated with a host"

/**
 * Get method to get all the controllers in the database
 * @param {*} req Query param
 * @param {*} res Query param
 */
controllerCtrl.getControllers = async (req, res) => {
  try {
    const controllers = await controller.find();
    res.json(controllers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Post method to create a new controller
 * @param {*} req Query param
 * @param {*} res Query param
 */
controllerCtrl.createControllers = async (req, res) => {
  try {
    const errorIP = await validateIp(req.body.ip);
    if(errorIP == ipErr)
      throw new Error(ipErr);

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
    await newcontroller.save();
    res.send({ message: "Controller saved" });
  } catch (error) {
    if(error.message === ipErr){
      res.status(403).send(error.message);  }          //Error if the IP already exists with a host
    else {
      if (error.keyValue.ip) res.status(401).send(error);   //Error if the IP already exists with other controller
      else{
      res.status(500).send(error.message);}     //Error if one of the attributes doesn't exist
    }
  }
};

/**
 * Get method to get an controller by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
controllerCtrl.getControllerById = async (req, res) => {
  try {
    const c = await controller.find({ indicator: req.params.indicator });

    res.send(c);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Put method to update a controller by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
controllerCtrl.updateController = async (req, res) => {
  try {
    const { name, symbol, ip, port, remote, type, x, y, color } = req.body;
    const errorIP = await validateIp(req.body.ip);
    if(errorIP == ipErr)
      throw new Error(ipErr);

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
      res.status(401).send(error.message);}     //Error if the IP already exists with other controller
    else{
      if(error.message === ipErr){
        res.status(403).send(error);
      }else{
      res.status(500).send(error.message);}
    }
  }
};

/**
 * Delete method to delete a controller by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
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

/**
 * It takes an IP address as a parameter, searches the database for that IP address, and if it finds
 * it, it throws an error.
 * @param ip - the ip address to be validated
 * @returns Nothing.
 */
async function validateIp(ip){

  const objOnDB = await hosts.find({ip: `${ip}`}).exec();
  
  if (objOnDB.length > 0) {
    return ipErr;
  }
  return;
}


module.exports = controllerCtrl;
