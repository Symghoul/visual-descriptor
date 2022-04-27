const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

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
  console.log('topo')
  res.status(200).send(`Todo listo patrón`)
});


function topocustom(custom, nameArchive ){
  let cus = {
    controllers: [custom.controllers],
    switches: [custom.switches],
    host:[custom.host],
    links:[custom.links]
  }
  console.log(custom);
  let writeStream = fs.createWriteStream(`${nameArchive}.sh`);
  writeStream.write(
    `from mininet.topo import Topo \n`+
    `from mininet.net import Mininet \n`+
    `from mininet.log import log \n`+
    `from mininet.cli import CLI \n`+
    `from mininet.util import irange \n`
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
