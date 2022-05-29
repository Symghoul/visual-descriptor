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

    //comando para escribir el script
    topocustom(topology, req.params.nameArchive);

    //Comando para ejecutar el script junto a mininet
    //exectMininet(req.params.nameArchive);

    res.status(200).json({ message: "El script está corriendo" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

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

generalController.load = async (req, res) => {
  if (req.files.file) {
    var split = req.files.file.name.split(".");
    //Hallo
    if (split[split.length - 1] !== "json") {
      res.status(400).send({
        message: "El archivo debe ser el .json generado por el descriptor",
      });
      return;
    }
    var file = req.files.file;

    var oldPath = `${file.tempFilePath}`;
    var newPath = "./src/load/alfa.json";

    console.log(`Renombrando ${file.tempFilePath}`);
    fs.renameSync(oldPath, newPath);

    try {
      await importDb();
      res.send("File Uploaded");
    } catch (e) {
      res.status(501).send(e);
    }
  }
};

async function switch2Controller() {
  const c = await controller.find();
  let adder = 0;
  let linksS;
  let linksD;
  let changer;

  for (let i = 0; i < c.length; i++) {
    linksS = await link.find({ source: `${c[i].symbol}` });
    linksD = await link.find({ destination: `${c[i].symbol}` });
    changer;

    for (let j = 0; j < linksS.length; j++) {
      let adder = i + 1;
      changer = linksS[j].to;

      await switche.updateOne(
        { indicator: `${changer.indicator}` },
        { controller: `c${adder}` }
      );
    }

    for (let j = 0; j < linksD.length; j++) {
      let adder = i + 1;
      changer = linksD[j].from;

      await switche.updateOne(
        { indicator: `${changer.indicator}` },
        { controller: `${c[i].symbol}` }
      );
    }
  }
}

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
    console.log(error);
    return error;
  }
}

async function importDb() {
  try {
    const { controllers } = await fs.readJSON("./src/load/alfa.json");
    const { switches } = await fs.readJSON("./src/load/alfa.json");
    const { hosts } = await fs.readJSON("./src/load/alfa.json");
    const { links } = await fs.readJSON("./src/load/alfa.json");

    console.log("---->");
    console.log(controllers);
    console.log(switches);
    console.log(hosts);
    console.log(links);

    console.log(`Listing Controlllers ${controllers.length}`);
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

      console.log(newController);
      let result = await newController.save();
      console.log(result);
      console.log(`Controller ${i} subido`);
    }
    console.log("end listing controllers");

    console.log(`Listing Switches${switches.length}`);
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
      console.log(`Switch ${i} subido`);
    }

    console.log(`Listing Host${hosts.length}`);
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
      console.log(`Host ${i} subido`);
    }

    console.log(`Listing Links: ${hosts.length}`);
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
      console.log(`Link ${i} subido`);
    }

    temp = "Salió todo perfectamente";
    return temp;
  } catch (error) {
    console.log("error");
    console.log(error);
    return error;
  }
}

function topocustom(topology, nameArchive) {
  let writeFileSync =
    `from mininet.topo import Topo \n` +
    `from mininet.net import Mininet \n` +
    `from mininet.log import info, setLogLevel \n` +
    `from mininet.cli import CLI \n` +
    `from mininet.node import Controller, RemoteController \n` +
    `\n` +
    `def topology(): \n` +
    ` "Create a network."\n` +
    ` net = Mininet( controller=Controller )\n` +
    `\n` +
    ` info("*** Creating nodes")\n`;
  topology.controllers.forEach((element) => {
    if (element === undefined) {
      console.log("Los controladores no estan definidos");
    } else if (element.remote) {
      writeFileSync += ` ${element.symbol} = net.RemoteController( '${element.symbol}', ip='${element.ip}', port=${element.port})\n`;
    } else {
      writeFileSync += ` ${element.symbol} = net.addController( '${element.symbol}', ip='${element.ip}', port=${element.port})\n`;
    }
  });

  topology.switches.forEach((element) => {
    if (element === undefined || element.symbol === undefined) {
      console.log("Los switches no estan definidos");
    } else {
      writeFileSync += ` ${element.symbol} = net.addSwitch( '${element.symbol}', procotols='${element.protocol}', listenPort=${element.listenPort}, mac='${element.mac}')\n`;
    }
  });

  topology.hosts.forEach((element) => {
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
      if (element.delay !== undefined) {
        writeFileSync += `, delay= ${element.delay}`;
      }
      if (element.loss !== undefined) {
        writeFileSync += `, loss= ${element.loss}`;
      }
      if (element.bandwith !== undefined) {
        writeFileSync += `, bw= ${element.bandwith}`;
      }
    }
    writeFileSync += `) \n`;
  });
  writeFileSync +=
    `\n` +
    ` info("*** Starting network")\n` +
    ` net.configureWifiNodes()\n` +
    `\n` +
    ` net.build()\n`;
  topology.controllers.forEach((element) => {
    if (element === undefined) {
      console.log("Los controladores no estan definidos");
    } else {
      writeFileSync += ` ${element.symbol}.start()\n`;
    }
  });
  topology.switches.forEach((element) => {
    if (element === undefined || element.symbol === undefined) {
      console.log("Los switches no estan definidos");
    } else {
      writeFileSync += ` ${element.symbol}.start( [${element.controller}] )\n`;
    }
  });

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

  fs.writeFileSync(`./src/data/${nameArchive}.sh`, writeFileSync);
}

function exectMininet(nameArchive) {
  exec(
    `echo mininet | sudo -S mn --custom=./src/data/${nameArchive}.sh`,
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
