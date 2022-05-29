const hostsCtrl = {};

const host = require("../model/hosts");

//Son requeridos para acceder a sus bases de datos netamente para validar
const controller = require("../model/controller");
const switche = require("../model/switch");

hostsCtrl.gethosts = async (req, res) => {
  const hosts = await host.find();
  res.json(hosts);
};

hostsCtrl.createhosts = async (req, res) => {
  const { indicator, name, symbol, ip, mask, mac, active, type, x, y, color } =
    req.body;
  const simpleMask = sMask(mask);
  const newHost = new host({
    indicator,
    name,
    symbol,
    ip,
    mask: simpleMask,
    mac,
    active,
    type,
    x,
    y,
    color,
  });
  try {
    await newHost.save();
    res.send({ message: "host guardado" });
  } catch (error) {
    if (error.keyValue.ip) res.status(401).send(error);
    else if (error.keyValue.mac) res.status(402).send(error);
  }
};

hostsCtrl.gethostById = async (req, res) => {
  try {
    const h = await host.find({ indicator: req.params.indicator });
    res.send(h);
  } catch (error) {
    res.status(500).send(error.message);
  }     
};

hostsCtrl.updatehost = async (req, res) => {
  try {
    const { name, symbol, ip, mask, mac, active, type, x, y, color } = req.body;
    
    /* // Un intento para validar que no hubiesen Keys repetidas pero al parecer la base de datos ya se encarga de eso
    if (host.collection) {
      
      const objOnDB = await host.find({ ip: `${req.body.ip}` });
      console.log("----------")
      console.log(objOnDB);

      if(objOnDB.length > 0){
        if(objOnDB.ip === req.body.ip){
          if(objOnDB.indicator !== req.body.indicator){
            throw new Error({"keyValue": {"ip" : "req.body.ip"}});
          }
          console.log("llegó hasta acá")
          console.log(objOnDB.indicator !== req.body.indicator);
        }
      }
      
    }*/


    await validateIp(req.params.indicator, ip);

    await validateMac(req.params.indicator, mac);


    const simpleMask = sMask(mask);
    const action = await host.updateOne(
      { indicator: req.params.indicator },
      {
        name,
        symbol,
        ip,
        mask: simpleMask,
        mac,
        active,
        type,
        x,
        y,
        color,
      }
    );
    
    if (action.matchedCount === 1) res.send({ message: "host modificado" });
    //else if(action.acknowledged && )
    else {
      res.send({ message: "No se modificó el host" });
    }
  } catch (error) {
    console.log(error);
    if (error.keyValue.ip) res.status(401).send(error);
    else if (error.keyValue.mac) res.status(402).send(error);
  }
};

hostsCtrl.deletehost = async (req, res) => {
  try {
    const action = await host.deleteOne({ indicator: req.params.indicator });
    if (action.deletedCount === 1) res.send({ message: "host eliminado" });
    else {
      res.send({ message: "host no eliminado" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

function sMask(mask) {
  let bits = mask;
  let split = bits.split(".");
  let sum = 1;
  let exit = false;
  for (let i = 0; i < split.length && !exit; i++) {
    if (Number(split[i]) === 0) {
      exit = true;
    } else {
      sum = sum * Number(split[i]);
    }
  }

  bits = Math.log(sum) / Math.log(2);
  bits = Math.round(bits);
  return bits;
}

async function validateIp(indicator, ip){
  const objOnDB = await controller.findOne( {ip: {ip} });
  console.log(objOnDB);
  if(objOnDB.length > 0){

    
      throw new Error({"keyValue": {"ip" : `${ip}`}});
    
    
  }
  return;
}

async function validateMac(indicator, mac){
  const objOnDB = await switche.find({ mac: `${mac}` });

  if(objOnDB.length > 0){

    if(objOnDB.indicator !== indicator){
      throw new Error({"keyValue": {"mac" : `${mac}`}});
    }
    
  }
  return;
}

module.exports = hostsCtrl;
