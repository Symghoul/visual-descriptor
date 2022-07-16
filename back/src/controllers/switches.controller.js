const switchesCtrl = {};

const switche = require("../model/switch");
const macErr = "Mac repeated with a host";

//Variable required to access to the databases to validate
const host = require("../model/hosts");

/**
 * Get method to get all the switches in the database
 * @param {*} req Query param
 * @param {*} res Query param
 */
switchesCtrl.getSwitches = async (req, res) => {
  try {
    const switches = await switche.find();

    res.json(switches);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Post method to create a new switch
 * @param {*} req Query param
 * @param {*} res Query param
 */
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
    if(error.keyValue){
      if (error.keyValue.mac) res.status(402).send(error);}    //Error if the mac already exists with other switch
    else{
      if(error.message === macErr){  //Error if the mac already exists with a host
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
 * Get method to get a switch by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
switchesCtrl.getSwitchById = async (req, res) => {
  try {
    const s = await switche.find({ indicator: req.params.indicator });

    res.send(s);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Put method to update a switch by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
switchesCtrl.updateSwitch = async (req, res) => {
  try {
    const { name, symbol, protocol, port, mac, controller, type, x, y, color } = req.body;
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
      res.status(402).send(error);      //Error if the mac already exists with other switch
    }else{ 
      if(error.message === macErr){
        res.status(405).send(error);    //Error if the mac already exists with a host
      }
      else{
        res.status(500).send(error.message);    //Error if one of the attributes doesn't exist
      }
    }
  }
};

/**
 * Delete method to delete a switch by an id
 * @param {*} req Query param
 * @param {*} res Query param
 */
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

/**
 * It takes an mac address as a parameter, searches the database for that mac address, and if it finds
 * it, it throws an error.
 * @param mac - The mac address of the switch
 * @returns Nothing.
 */
async function validateMac(mac){
  const objOnDB = await host.find({ mac: `${mac}` });

  if(objOnDB.length > 0){
      throw new Error(macErr);
  }
  return;
}

module.exports = switchesCtrl;
