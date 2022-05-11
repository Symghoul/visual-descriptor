const express = require('express')
const app = express()
const fs = require('fs')
const util = require('util')
const lodash = require('lodash');

const model = require('./model/controller')
//const port = 3000

app.use(express.json());

module.exports = app;

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

//app.listen(port, () => {
//  console.log(`app listening on port ${port}`)
//})

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
  // else if(topo.tree != null){
  //   topotree(topo.tree, topo.nameArchive)
  // } 
  // else if(topo.lineal != null){
  //   topolineal(topo.lineal, topo.nameArchive)
  // }

   // El comando para ejecutar mininet, recordar usar el nombre del archivo para nombrar el script

  res.status(200).send(`Funciona perfectamente`)
});


function topocustom(custom, nameArchive ){
  
  //var cus = {
  //  controllers: [custom.controller],
  //  switches: [custom.switches],
  //  hosts:[custom.hosts],
  //  links:[custom.links]
  //}
  //console.log(custom)
  //custom.controllers.forEach(element => {
  //  var controller = (element)
  //  for(let prop in element) {
  //    controller.prop = element.prop
//
  //  }
  //  custom.controllers.push(controller)
  //})
//
  //custom.switches.forEach(element => {
  //  var switche = (element)
  //  for(let prop in element) {
  //    switche.prop = element.prop
  //  }
  //  
  //  custom.switches.push(switche)
  //})
//
  //custom.hosts.forEach(element => {
  //  var host = (element)
  //  for(let prop in element) {
  //    host.prop = element.prop
  //  }
  //  
  //  custom.hosts.push(host)
  //})
//
  //custom.links.forEach(element => {
  //  var link = (element)
  //  for(let prop in element) {
  //    link.prop = element.prop
  //  }
  //  custom.links.push(link);
  //  
  //})
  
  let writeFileSync =(
    `from mininet.topo import Topo \n`+
    `from mininet.net import Mininet \n`+
    `from mininet.log import info, setLogLevel \n`+
    `from mininet.cli import CLI \n`+
    `from mininet.node import Controller, RemoteController \n`+
`\n`+
    `def topology(): \n`+
    ` "Create a network."\n`+
    ` net = Mininet( co ntroller=Controller )\n`+
`\n`+
    ` info("*** Creating nodes")\n`);
  custom.controllers.forEach(element =>{
    if(element === undefined){
      console.log("Los controladores no estan definidos")}
    else if(element.remote){
      writeFileSync += ` ${element.id} = net.RemoteController( '${element.id}', ip='${element.ip}', port=${element.port})\n`}
    else{
    writeFileSync += ` ${element.id} = net.addController( '${element.id}', ip='${element.ip}', port=${element.port})\n`}
  })

  custom.switches.forEach(element =>{
    
    if(element === undefined || element.id === undefined){
      console.log("Los switches no estan definidos")}

    else{
      writeFileSync += ` ${element.id} = net.addSwitch( '${element.id}', procotols='${element.protocol}', listenPort=${element.listenPort}, mac='${element.mac}')\n`}
    })
    
  custom.hosts.forEach(element =>{
    if(element.mask != undefined){
      var sum = mask(element.mask)}
        
    if(element === undefined || element.id === undefined){
        console.log("Los hosts no estan definidos")}
    else if(element.mac === undefined)
      writeFileSync += ` ${element.id} = net.addHost( '${element.id}', ip='${element.ip}/${sum}') \n`
    else{
      writeFileSync += ` ${element.id} = net.addHost( '${element.id}', mac='${element.mac}', ip='${element.ip}/${sum}') \n`
    }
  });
          
    writeFileSync += (`\n\n info("*** Creating links")\n`);
    custom.links.forEach(element=>{
      if(element === undefined || element.id === undefined){
        console.log("Los links no estan definidos")}
      else{
        writeFileSync += ` net.addLink(${element.source}, ${element.destination} `
        if(element.delay !== undefined){
          writeFileSync += `, ${element.delay}`
        }if(element.loss !== undefined){
          writeFileSync += `, ${element.loss}`
        }if(element.bandwith !== undefined){
          writeFileSync += `, ${element.bandwith}`
        }
      }
      writeFileSync += `) \n`
    });
    writeFileSync += (`\n`+
    ` info("*** Starting network")\n`+
    ` net.configureWifiNodes()\n`+
    `\n`+
    ` net.build()\n`);
    custom.controllers.forEach(element =>{
      if(element === undefined){
        console.log("Los controladores no estan definidos")}
      else {
      writeFileSync += (` ${element.id}.start()\n` )
        }})
    custom.switches.forEach(element =>{
    
      if(element === undefined || element.id === undefined){
        console.log("Los switches no estan definidos")}

      else{
        writeFileSync += (` ${element.id}.start( [${element.controller}] )\n`);}
      })
    

    writeFileSync += (
    `\n`+
    `\n`+
    ` info("*** Running CLI")\n`+
    ` CLI( net )\n`+
    `\n`+

    `if __name__ == '__main__':\n`+
    ` setLogLevel( 'info' )\n`+
    ` topology()\n`

    );

// Aqui va el comando para crear el script createScript();
  
  fs.writeFileSync(`${nameArchive}`, writeFileSync);

}

//function topolineal(_lineal){
////Aquí va la recepción especifica de los parametros para correr los ejemplos y con eso va el script
//}
//
//function topotree(_tree){
////Aquí va la recepción especifica de los parametros para correr los ejemplos y con eso va el script
//}

function mask(mac){

  let bits = (mac)
  let split = bits.split(".")
  let sum = 1;
  let exit = false;
  for (let i = 0; i < split.length && !exit; i++) {

      if(Number(split[i])===0){
        exit = true
      }else{
      sum = sum*Number(split[i]);
    }
  }
  
  bits = Math.log(sum)/Math.log(2)
  bits = Math.round(bits)
  return bits;
}