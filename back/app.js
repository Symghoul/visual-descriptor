const express = require('express')
const app = express()
const fs = require('fs')
const util = require('util')

const model = require('./model/controller')
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

app.post('/export', function (req, res){

  let topo ={
    custom : req.body.custom,
    tree : req.body.tree,
    lineal : req.body.lineal,
    nameArchive : req.body.nameArchive
    }
    
    
   if(topo.custom != null) {
     topocustom(topo.custom, topo.nameArchive)
   }
   else if(topo.tree != null){
     topotree(topo.tree, topo.nameArchive)
   } 
   else if(topo.lineal != null){
     topolineal(topo.lineal, topo.nameArchive)
   }

   // El comando para ejecutar mininet, recordar usar el nombre del archivo para nombrar el script

  res.status(200).send(`Todo listo patrón`)
});


function topocustom(custom, nameArchive ){
  
  var cus = {
    controllers: [custom.controller],
    switches: [],
    host:[],
    links:[]
  }
  
  custom.controllers.forEach(element => {
    var controller = (element)
    //controller = Object.assign(Controller.prototype, controller)
    for(let prop in element) {
      controller.prop = element.prop
    }
    cus.controllers.push(controller)
    console.log(cus.controllers)
    //console.log(element)
    //console.log(cus)
  })
  let writeStream = fs.createWriteStream(`${nameArchive}.sh`);
  writeStream.write(
    `from mininet.topo import Topo \n`+
    `from mininet.net import Mininet \n`+
    `from mininet.log import info, setLogLevel \n`+
    `from mininet.cli import CLI \n`+
    `from mininet.node import Controller, RemoteComntroller \n`+
`\n`+
    `def topology(): \n`+
    ` "Create a network."\n`+
    ` net = Mininet_wifi( controller=Controller )\n`+
`\n`+
    ` info("*** Creating nodes")\n`);
  //  console.log(controllers.Object)
  cus.controllers.forEach(element =>{
    if(element === !undefined)
    writeStream.write(`${element.id} = net.addController( '${element.id}', ip=${element.ip}, port=${element.port})\n`);
    //console.log(element)
  });

  
  //}
  //  
  //  }
  writeStream.write(
    
    ` s2 = net.addSwitch( 's2', protocols='OpenFlow10', listenPort=6673, mac='00:00:00:00:00:02' )\n`+
    ` s3 = net.addSwitch( 's3', protocols='OpenFlow10', listenPort=6674, mac='00:00:00:00:00:03' )\n`+
    ` h4 = net.addHost( 'h4', mac='00:00:00:00:00:04', ip='10.0.0.4/8' )\n`+
    ` h5 = net.addHost( 'h5', mac='00:00:00:00:00:05', ip='10.0.0.5/8' )\n`+
    ` h6 = net.addHost( 'h6', mac='00:00:00:00:00:06', ip='10.0.0.6/8' )\n`+
    ` h7 = net.addHost( 'h7', mac='00:00:00:00:00:07', ip='10.0.0.7/8' )\n`+
`\n`+
    ` info("*** Creating links")\n`+
    ` net.addLink(h4, s2)\n`+
    ` net.addLink(h5, s2)\n`+
    ` net.addLink(h6, s3)\n`+
    ` net.addLink(h7, s3)\n`+
`\n`+
    ` info("*** Starting network")\n`+
    ` net.configureWifiNodes()\n`+
`\n`+
    ` net.build()\n`+
    ` c1.start()\n`+
    ` s3.start( [c1] )\n`+
    ` s2.start( [c1] )\n`+
`\n`+
`\n`+
    ` info("*** Running CLI")\n`+
    ` CLI_wifi( net )\n`+
`\n`+
    ` info("*** Stopping network")\n`+
    ` net.stop()\n`+

    `if __name__ == '__main__':\n`+
    ` setLogLevel( 'info' )\n`+
    ` topology()\n`

    );
  writeStream.on('finish', ()=>{
    console.log('I wrote all data to file');
  });

  writeStream.end();
  // Aqui iría el comando para crear el script createScript();
 
}

function topolineal(lineal){
//Aquí va la recepción especifica de los parametros para correr los ejemplos y con eso va el script
}

function topotree(tree){
//Aquí va la recepción especifica de los parametros para correr los ejemplos y con eso va el script
}
