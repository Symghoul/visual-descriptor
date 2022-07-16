const generalController = {};
const { exec } = require("child_process");

const db = require("mongodb");
const bson = require("bson");
const fs = require("fs-extra");

const controller = require("../model/controller");
const switche = require("../model/switch");
const host = require("../model/hosts");
const link = require("../model/link");

let newController;
let newSwitche;
let newHost;
let newlink;

/**
 * A function that is called when the user clicks on the button "Export" in the frontend.
 * @param {*} req Query param
 * @param {*} res Query param
 */
generalController.getScript = async (req, res) => {
  try {
    await switch2Controller();
    

    const controllers = await controller.find();
    const hosts = await host.find();
    const switches = await switche.find();
    const links = await link.find();
    
    var topology = {
      controllers,
      hosts,
      switches,
      links,
    };

    const err = await exportDb(req.params.nameArchive);
    if (!err) {
      res.status(501).send(err.message);
    }

    topocustom(topology, req.params.nameArchive);

    //exectMininet(req.params.nameArchive);

    res.status(200).json({ message: "Script running" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * A function that is called when the user clicks on the button "Strat again?" in the frontend.
 * @param {*} req Query param
 * @param {*} res Query param
 */
generalController.eraseDB = async (req, res) => {
  try {
    await controller.collection.drop();
  } catch (error) {
    console.log("controller collection does not exist");
  }
  try {
    await switche.collection.drop();
  } catch (error) {
    console.log("switche collection does not exist");
  }
  try {
    await host.collection.drop();
  } catch (error) {
    console.log("host collection does not exist");
  }
  try {
    await link.collection.drop();
  } catch (error) {
    console.log("link collection does not exist");
  }
  console.log("DB cleaned");
  res.send({ message: "DB dropped succesfully" });
};

/**
 * A function that is called when the user clicks on the button "Load" in the frontend.
 * @param {*} req 
 * @param {*} res 
 * @returns Nothing
 */
generalController.load = async (req, res) => {
  if (req.files.file) {   //in the param req, there is a attribute called files who has the name od the file at the request's body
    var fileNameAndExt = req.files.file.name.split("."); //First, we separate the file's name and the extention
    
    if (fileNameAndExt[fileNameAndExt.length - 1] !== "json") {   //It verifies if the file is json and sends a warning to the frontend
      res.status(400).send({
        message: "El archivo debe ser el .json generado por el descriptor",
      });
      return;
    }
    var file = req.files.file;

    var oldPath = `${file.tempFilePath}`;
    var newPath = "./src/load/alfa.json";

    fs.renameSync(oldPath, newPath);    //Fs renames the file with the name that the client wants to give to the file, because the file was saved with a temporal an unreadible name for humans

    try {
      await importDb();
      res.send("File Uploaded");
    } catch (e) {
      res.status(501).send(e);
    }
  }
};

/**
 * It takes the symbol of a controller, finds all the links that have that symbol as a source or
 * destination, and then updates the controller field of the switches that are connected to those
 * links.
 */
async function switch2Controller() {
  const c = await controller.find();
  let adder = 0;
  let linksS;
  let linksD;
  let changer;
  for (let i = 0; i < c.length; i++) {    //It gets the links whose have the controller i in source or destination attribute
    linksS = await link.find({ source: `${c[i].symbol}` });
    linksD = await link.find({ destination: `${c[i].symbol}` });
    changer;
    
    for (let j = 0; j < linksS.length; j++) {   //search in the source's list of an i controller the switch connected to him and update it.
      let adder = i + 1;
      changer = linksS[j].destination;    //Because it is searching on the source attribute, the switch is in the destination attribute
      
      
      await switche.updateOne(
        { indicator: `${changer.indicator}` },
        { controller: `${c[i].symbol}` }
      );
    }

    for (let j = 0; j < linksD.length; j++) {  //search in the destination's list of an i controller the switch connected to him and update it.
      let adder = i + 1;
      changer = linksD[j].source;     //Because it is searching on the destination attribute, the switch is in the source attribute

      await switche.updateOne(
        { indicator: `${changer.indicator}` },
        { controller: `${c[i].symbol}` }
      );
    }
  }
}

/**
 * It takes a name (the client's file name) as a parameter, then it finds all the data from the database, then it creates a JSON
 * file with the name given as a parameter and then it writes the data found in the database to the
 * JSON file.
 * @param name - name of the file to be saved 
 * @returns a promise. (A variable to take action in the method whose is called, that is, getScript())
 */
async function exportDb(name) {
  try {
    const controllers = await controller.find();
    const hosts = await host.find();
    const switches = await switche.find();
    const links = await link.find();

    let db = `{"controllers": ${JSON.stringify(
      controllers
    )}, "switches":${JSON.stringify(switches)}, "hosts":${JSON.stringify(
      hosts
    )}, "links":${JSON.stringify(links)}}`;

    fs.writeFileSync(`./src/data/${name}.json`, db);
    temp = "Salió todo perfectamente";
    return temp;
  } catch (error) {
    return error;
  }
}

/**
 * It reads a JSON file, then it creates a new object for each of the four arrays in the JSON file, and
 * then it saves each object in the database.
 * @returns a promise. (A variable to take action in the method whose is called, that is, load())
 */
async function importDb() {
  try {
    const { controllers } = await fs.readJSON("./src/load/alfa.json");
    const { switches } = await fs.readJSON("./src/load/alfa.json");
    const { hosts } = await fs.readJSON("./src/load/alfa.json");
    const { links } = await fs.readJSON("./src/load/alfa.json");

    for (let i = 0; i < controllers.length; i++) {
      newController = new controller({
        indicator: controllers[i].indicator,
        name: controllers[i].name,
        symbol: controllers[i].symbol,
        ip: controllers[i].ip,
        port: controllers[i].port,
        remote: controllers[i].remote,
        type: controllers[i].type,
        x: controllers[i].x,
        y: controllers[i].y,
        color: controllers[i].color,
      });

      let result = await newController.save();
    }

    for (let i = 0; i < switches.length; i++) {
      newSwitche = new switche({
        indicator: switches[i].indicator,
        name: switches[i].name,
        symbol: switches[i].symbol,
        protocol: switches[i].protocol,
        port: switches[i].port,
        controller: switches[i].controller,
        mac: switches[i].mac,
        type: switches[i].type,
        x: switches[i].x,
        y: switches[i].y,
        color: switches[i].color,
      });
      await newSwitche.save();
    }

    for (let i = 0; i < hosts.length; i++) {
      newHost = new host({
        indicator: hosts[i].indicator,
        name: hosts[i].name,
        symbol: hosts[i].symbol,
        ip: hosts[i].ip,
        mask: hosts[i].mask,
        mac: hosts[i].mac,
        active: hosts[i].active,
        type: hosts[i].type,
        x: hosts[i].x,
        y: hosts[i].y,
        color: hosts[i].color,
      });
      await newHost.save();
    }

    for (let i = 0; i < links.length; i++) {
      newlink = new link({
        indicator: links[i].indicator,
        delay: links[i].delay,
        loss: links[i].loss,
        bandwidth: links[i].bandwidth,
        from: links[i].from,
        to: links[i].to,
        source: links[i].source,
        destination: links[i].destination,
        type: links[i].type,
        color: links[i].color,
      });
      await newlink.save();
    }

    temp = "Salió todo perfectamente";
    return temp;
  } catch (error) {
    return error;
  }
}

/**
 * It takes a topology object and a name for the file to be created, and then it creates a python
 * script with the topology information.
 * @param topology - the object that contains the topology data
 * @param nameArchive - The name of the file to be created.
 */
function topocustom(topology, nameArchive) {
  
  let writeFileSync =
    //`#!/usr/bin/python`
    
    `from mininet.net import Mininet \n` +
    `from mininet.log import info, setLogLevel \n` +
    `from mininet.cli import CLI \n` +
    `from mininet.node import Controller, RemoteController \n` +
    `from mininet.link import TCLink\n` +
    `\n` +
    `def topology(): \n` +
    ` "Create a network."\n` +
    ` net = Mininet( controller=Controller, waitConnected=True, link=TCLink )\n` +
    `\n` +
    ` info("*** Adding controller")\n`;
  topology.controllers.forEach((element) => {
    if (element === undefined) {
      console.log("Los controladores no estan definidos");
    } else if (element.remote) {
      writeFileSync += ` net.RemoteController( '${element.symbol}', ip='${element.ip}', port=${element.port})\n`;
    } else {
      writeFileSync += ` net.addController( '${element.symbol}', ip='${element.ip}', port=${element.port})\n`;
    }
  });
  
  topology.switches.forEach((element) => {
    writeFileSync += ` info("*** Adding switches")\n`;
    if (element === undefined || element.symbol === undefined) {
      console.log("Los switches no estan definidos");
    } else {
      writeFileSync += ` ${element.symbol} = net.addSwitch( '${element.symbol}', protocols='${element.protocol}', port=${element.port}, mac='${element.mac}')\n`;
    }
  });
  
  topology.hosts.forEach((element) => {
    writeFileSync += ` info("*** Adding nodes")\n`;
    if (element === undefined || element.symbol === undefined) {
      console.log("Los hosts no estan definidos");
    } else if (element.mac === undefined)
      writeFileSync += ` ${element.symbol} = net.addHost( '${element.symbol}', ip='${element.ip}/${element.mask}') \n`;
    else {
      writeFileSync += ` ${element.symbol} = net.addHost( '${element.symbol}', mac='${element.mac}', ip='${element.ip}/${element.mask}') \n`;
    }
  });

  writeFileSync += `\n\n info("*** Creating links")\n`;
  topology.links.forEach((element) => {
    if (element === undefined) {
      console.log("Los links no estan definidos");
    } else {
      writeFileSync += ` net.addLink(${element.source}, ${element.destination} `;
      if (element.bandwidth !== undefined) {
        if(element.bandwidth === 0){
          writeFileSync += `, bw=1`;
        }
        else{
        writeFileSync += `, bw=${element.bandwidth}`;
        }
      }
      if (element.delay !== undefined) {
        writeFileSync += `, delay='${element.delay}ms'`;
      }
      if (element.loss !== undefined) {
        writeFileSync += `, loss=${element.loss}`;
      }

    }
    writeFileSync += `) \n`;
  });
  writeFileSync +=
    `\n` +
    ` info("*** Starting network")\n` +
    `\n` +
    ` net.start()\n`;
  //topology.controllers.forEach((element) => {
  //  if (element === undefined) {
  //    console.log("Los controladores no estan definidos");
  //  } else {
  //    writeFileSync += ` ${element.symbol}.start()\n`;
  //  }
  //});
  //topology.switches.forEach((element) => {
  //  if (element === undefined || element.symbol === undefined) {
  //    console.log("Los switches no estan definidos");
  //  } else {
  //    writeFileSync += ` ${element.symbol}.start( [${element.controller}] )\n`;
  //  }
  //});

  writeFileSync +=
    `\n` +
    `\n` +
    ` info("*** Running CLI")\n` +
    ` CLI( net )\n` +
    `\n` +
    `if __name__ == '__main__':\n` +
    ` setLogLevel( 'info' )\n` +
    ` topology()\n`;

  // Aqui va el comando para crear el script createScript();

  fs.writeFileSync(`./src/data/${nameArchive}.py`, writeFileSync);
}

/**
 * It executes a python script in a new xterm window.
 * @param nameArchive - name of the file to be executed
 */
function exectMininet(nameArchive) {
  exec(
    `xterm -e sudo ./src/data/${nameArchive}.py`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}

module.exports = generalController;
