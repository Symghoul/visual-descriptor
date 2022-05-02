const express = require('express')
const app = express()
const fs = require('fs')
const util = require('util')

const model = require('./model/controller')
const port = 3000

app.use(express.json());

app.get('/', (_req, res) => {
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
  
  //var cus = {
  //  controllers: [custom.controller],
  //  switches: [custom.switches],
  //  hosts:[custom.hosts],
  //  links:[custom.links]
  //}
  console.log(custom)
  custom.controllers.forEach(element => {
    var controller = (element)
    for(let prop in element) {
      controller.prop = element.prop

    }
    cus.controllers.push(controller)
  })

  custom.switches.forEach(element => {
    var switche = (element)
    for(let prop in element) {
      switche.prop = element.prop
    }
    
    cus.switches.push(switche)
  })

  custom.hosts.forEach(element => {
    var host = (element)
    for(let prop in element) {
      host.prop = element.prop
    }
    
    cus.hosts.push(host)
  })

  custom.links.forEach(element => {
    var link = (element)
    for(let prop in element) {
      link.prop = element.prop
    }
    cus.links.push(link);
    
  })
  
  let writeFileSync =(
    `from mininet.topo import Topo \n`+
    `from mininet.net import Mininet \n`+
    `from mininet.log import info, setLogLevel \n`+
    `from mininet.cli import CLI \n`+
    `from mininet.node import Controller, RemoteController \n`+
`\n`+
    `def topology(): \n`+
    ` "Create a network."\n`+
    ` net = Mininet_wifi( controller=Controller )\n`+
`\n`+
    ` info("*** Creating nodes")\n`);
 // console.log(cus.controllers, cus.switches, cus.hosts )
  cus.controllers.forEach(element =>{
    if(element === undefined)
      console.log("Los controladores no estan definidos")
    else if(element.remote){
      writeFileSync += ` ${element.id} = net.RemoteController( '${element.id}', ip='${element.ip}', port=${element.port})\n`}
    else{
    writeFileSync += ` ${element.id} = net.addController( '${element.id}', ip='${element.ip}', port=${element.port})\n`}
  })

  cus.switches.forEach(element =>{
    
    if(element === undefined || element.id === undefined)
      console.log("Los switches no estan definidos")

    else{
    writeFileSync += ` ${element.id} = net.addSwitch( '${element.id}', procotols='${element.protocol}', listenPort=${element.listenPort}, mac='${element.mac}')\n`}
  })

  cus.hosts.forEach(element =>{
    if(element.mask != undefined){
      let sum = mask(element.mask)}
    
    if(element === undefined || element.id === undefined)
      console.log("Los hosts no estan definidos")
    else if(element.mac === undefined)
    writeFileSync += ` ${element.id} = net.addHost( '${element.id}', ip=${element.ip}) \n`
    else{
    writeFileSync += ` ${element.id} = net.addHost( '${element.id}', mac='${element.mac}', ip=${element.ip}) \n`}
  });

  writeFileSync +=
    
    ` s2 = net.addSwitch( 's2', protocols='OpenFlow10', listenPort=6673, mac='00:00:00:00:00:02' )\n`+
    ` s3 = net.addSwitch( 's3', protocols='OpenFlow10', listenPort=6674, mac='00:00:00:00:00:03' )\n`+
    ` h4 = net.addHost( 'h4', mac='00:00:00:00:00:04', ip='10.0.0.4/8' )\n`+
    ` h5 = net.addHost( 'h5', mac='00:00:00:00:00:05', ip='10.0.0.5/8' )\n`+
    ` h6 = net.addHost( 'h6', mac='00:00:00:00:00:06', ip='10.0.0.6/8' )\n`+
    ` h7 = net.addHost( 'h7', mac='00:00:00:00:00:07', ip='10.0.0.7/8' )\n`+
`\n`+
//host, switch, bw=10, delay='5ms', loss=2,
//                          max_queue_size=1000, use_htb=True )
//
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

    ;

  // Aqui iría el comando para crear el script createScript();
  
  fs.writeFileSync(`${nameArchive}.sh`, writeFileSync);

}

function topolineal(_lineal){
//Aquí va la recepción especifica de los parametros para correr los ejemplos y con eso va el script
}

function topotree(_tree){
//Aquí va la recepción especifica de los parametros para correr los ejemplos y con eso va el script
}

function mask(mac){

  let bits = (mac)
  let split = bits.split()
  let sum = split[0]+split[1]+split[2]+split[3]
  bits = Math.log(sum)/Math.log(2)
  console.log(bits)
  return bits;
}