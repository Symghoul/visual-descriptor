const generalController = {};
const { exec } = require("child_process");

const fs = require("fs");

const controller = require("../model/controller");
const host = require("../model/hosts");
const switche = require("../model/switch");
const link = require("../model/link");
const { stderr } = require("process");

generalController.getScript = async (req, res) => {
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

  //switch2Controller();

  //comando para escribir el script
  topocustom(topology, req.params.nameArchive);

  /** 
    //Comando para ejecutar el script junto a mininet
    exectMininet(req.params.nameArchive)
    */
  res.status(200).json({ message: "El script está corriendo" });
};

function switch2Controller(){
  const links = link.find({"source":"c1"}||{"destination":"c1"})
  links.forEach(element => {
    
  });
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

  fs.writeFileSync(`${nameArchive}.sh`, writeFileSync);
}


function exectMininet(nameArchive) {
  exec(`mn --custom=${nameArchive}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

module.exports = generalController;
