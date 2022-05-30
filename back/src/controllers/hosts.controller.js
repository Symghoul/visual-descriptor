const hostsCtrl = {};

const host = require("../model/hosts");
const ipErr = "ip repeated with a Controller";
const macErr = "Mac repeated with a Controller";

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
    mask ,
    mac2script: simpleMask,
    mac,
    active,
    type,
    x,
    y,
    color,
  });
  try {
    await newHost.save();
    res.send({ message: "host saved" });
  } catch (error) {
    if(error.keyValue){
      if (error.keyValue.ip) res.status(401).send(error);
      else if (error.keyValue.mac) res.status(402).send(error);}
    else{
      if(error.message === ipErr){
        res.status(403).send(error);
      }else if(error.message === macErr){
        res.status(405).send(error);
      }
      else{
        console.log(error);
      }
    }
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
    
    await validateIp(ip);

    await validateMac(mac);


    const simpleMask = sMask(mask);
    const action = await host.updateOne(
      { indicator: req.params.indicator },
      {
        name,
        symbol,
        ip,
        mask,
        mac2script:simpleMask,
        mac,
        active,
        type,
        x,
        y,
        color,
      }
    );
    
    if (action.matchedCount === 1) res.send({ message: "host modified" });
    //else if(action.acknowledged && )
    else {
      res.send({ message: "host does not modified" });
    }
  } catch (error) {
      if(error.keyValue){
        if (error.keyValue.ip) res.status(401).send(error);
        else if (error.keyValue.mac) res.status(402).send(error);}
      else{ 
        if(error.message === ipErr){
          res.status(403).send(error);
        }else if(error.message === macErr){
          res.status(405).send(error);
        }
        else{
          res.status(500).send(error.message)
        }
      }
    }
};

hostsCtrl.deletehost = async (req, res) => {
  try {
    const action = await host.deleteOne({ indicator: req.params.indicator });
    if (action.deletedCount === 1) res.send({ message: "host deleted" });
    else {
      res.send({ message: "host does not deleted" });
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

async function validateIp(ip){
  
  const objOnDB = await controller.find({ip:`${ip}`}).exec();

  if(objOnDB.length > 0){
      throw new Error(ipErr);
  }
  return;
}

async function validateMac(mac){
  const objOnDB = await switche.find({ mac: `${mac}` });

  if(objOnDB.length > 0){
      throw new Error(macErr);
  }
  return;
}

module.exports = hostsCtrl;
