const hostsCtrl = {};

const host = require("../model/hosts");
const ipErr = "ip repeated with a Controller";
const macErr = "Mac repeated with a Controller";

//Variables required to access to the databases to validate
const controller = require("../model/controller");
const switche = require("../model/switch");


/**
 * Get method to get all the hosts in the database
 * @param {*} req Query param
 * @param {*} res Query param
 */
hostsCtrl.gethosts = async (req, res) => {
  const hosts = await host.find();
  res.json(hosts);
};

/**
 * Post method to create a new host
 * @param {*} req Query param
 * @param {*} res Query param
 */
hostsCtrl.createhosts = async (req, res) => {

  const { indicator, name, symbol, ip, mask, mac, active, type, x, y, color } = req.body;
  const simpleMask = sMask(mask);
  const newHost = new host({
    indicator,
    name,
    symbol,
    ip,
    mask ,
    mask2script: simpleMask,
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
      if (error.keyValue.ip) res.status(401).send(error);   //Error if the IP already exists with other host
      else if (error.keyValue.mac) res.status(402).send(error);}    //Error if the mac already exists with other host
    else{
      if(error.message === ipErr){        //Error if the IP already exists with a controller
        res.status(403).send(error);
      }else if(error.message === macErr){  //Error if the mac already exists with a switch
        res.status(405).send(error);
      }
      else{
        console.log(error);
        res.status(500).send(error)     //Error if one of the attributes doesn't exist
      }
    }
  }
};

/**
 * Get method to get an controller by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
hostsCtrl.gethostById = async (req, res) => {
  try {
    const h = await host.find({ indicator: req.params.indicator });
    res.send(h);
  } catch (error) {
    res.status(500).send(error.message);
  }     
};

/**
 * Put method to update a host by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
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
        mask2script:simpleMask,
        mac,
        active,
        type,
        x,
        y,
        color,
      }
    );
    
    if (action.matchedCount === 1) res.send({ message: "host modified" });
    
    else {
      res.send({ message: "host does not modified" });
    }
  } catch (error) {
      if(error.keyValue){
        if (error.keyValue.ip) res.status(401).send(error);     //Error if the IP already exists with other host
        else if (error.keyValue.mac) res.status(402).send(error);}    //Error if the mac already exists with other host
      else{ 
        if(error.message === ipErr){              //Error if the IP already exists with a controller
          res.status(403).send(error);
        }else if(error.message === macErr){       //Error if the mac already exists with a switch
          res.status(405).send(error);
        }
        else{
          res.status(500).send(error.message)      //Error if one of the attributes doesn't exist
        }
      }
    }
};

/**
 * Delete method to delete a host by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
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


/**
 * It takes a mask in the form of a string, splits it into an array, multiplies each element, and then
 * takes the log base 2 of the product, that means, parses a 4 bytes mask to a "/#" with # between 1-32.
 * @param mask - The subnet mask in dotted decimal notation.
 * @returns a between 1-32 (The mask in compressed form).
 */
function sMask(mask) {
  let bits = mask;
  let split = bits.split(".");
  let count = 1;
  let exit = false;
  for (let i = 0; i < split.length && !exit; i++) {   //Sums all the bytes at the mask, for example: 255.255.255.0, the for block multiplies 255*255*255 
    if (Number(split[i]) === 0) {
      exit = true;
    } else {
      count = count * Number(split[i]);
    }
  }

  bits = Math.log(count) / Math.log(2);       //takes the log base 2 of the bits
  bits = Math.round(bits);                    //There is the number # who is after the "/" in a mask
  return bits;
}

/**
 * It takes an IP address as a parameter, searches the database for that IP address, and if it finds
 * it, it throws an error.
 * @param ip - the ip address to be validated
 * @returns Nothing.
 */
async function validateIp(ip){
  
  const objOnDB = await controller.find({ip:`${ip}`}).exec();

  if(objOnDB.length > 0){
      throw new Error(ipErr);
  }
  return;
}

/**
 * It takes an mac address as a parameter, searches the database for that mac address, and if it finds
 * it, it throws an error.
 * @param mac - The mac address of the switch
 * @returns Nothing.
 */
async function validateMac(mac){
  const objOnDB = await switche.find({ mac: `${mac}` });

  if(objOnDB.length > 0){
      throw new Error(macErr);
  }
  return;
}

module.exports = hostsCtrl;
