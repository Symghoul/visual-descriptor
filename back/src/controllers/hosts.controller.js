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
        mask: simpleMask,
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

async function newIp(ip, mask){
  let split = ip.split(".")
  let newIp1 = Number(split[0]);
  let newIp2 = Number(split[1]);
  let newIp3 = Number(split[2]);
  let newIp4 = Number(split[3]);
  if(mask<=7){
      if(newIp1===254 && newIp2===254 && newIp3===254 && newIp4===254){
          newIp1=1;
      }else if(newIp2===254 && newIp3===254 && newIp4===254){
          newIp2 = 1;
      }else if(newIp3===254 && newIp4===254){
          newIp2+=1; 
      }else if(newIp4===254){
          newIp3+=1;
      }
  }
  else if(mask<=15){
      if(newIp2===254 && newIp3===254 && newIp4===254){
          newIp2 = 1;
      }else if(newIp3===254 && newIp4===254){
          newIp2+=1; 
      }else if(newIp4===254){
          newIp3+=1;
      }
  }
  else if(mask<=23){
      if(newIp3===254 && newIp4===254){
          newIp3=1; 
      }else if(newIp4===254){
          newIp3+=1;
      }
  }
  if(newIp4===254){
      newIp4 = 1;
  }
  else {newIp4 = newIp4+1;}

  ip= newIp1+"."+newIp2+"."+newIp3+"."+newIp4;
  return ip;
}

async function newMac(req,res){
  let mac = req.body.mac;
  let split = mac.split(":");
  let newMac1 = "";
  let newMac2 = "";
  let exit = false;
  //
  for(let i=(split.length-1) ;i>=0 && !exit;i--){
      let six = split[i];
      console.log()
      if(six=="FF"){
          newMac1="0";
          newMac2="0";
      }else if(six.substring(1)=="F"){
          newMac1 = convert2Hex(six.substring(0,1));
          newMac2 = "0"
          exit = true;
      }else{
          newMac1 = six.substring(0,1);
          newMac2 = convert2Hex(six.substring(1,2));
          exit = true;
      }
      split[i] = ""+newMac1+newMac2;
      }
  mac = split.toString();
  res.send({"mac":`${mac.replaceAll(",",":", "")}`})
}

module.exports = hostsCtrl;
