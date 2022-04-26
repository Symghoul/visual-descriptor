const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

app.post('/export', function (req, res){

  console.log(req.body.custom)
  console.log(req.body.tree)
  console.log(req.body.lineal)
  console.log(req.body.nameArchive)
  let topo ={
    custom : req.body.custom,
    tree : req.body.tree,
    lineal : req.body.lineal,
    nameArchive : req.body.nameArchive
    }
   if(topo.custom != null) {
     topocustom(custom)
   }
   else if(topo.tree != null){
     topotree(tree)
   } 
   else if(topo.lineal != null){
     topolineal(lineal)
   }

   // El comando para ejecutar mininet, recordar usar el nombre del archivo para nombrar el script
  console.log('topo')
  res.status(200).send('Todo listo patrón')
});


function topocustom(custom){
  let cus = {
    controllers: cus.body.controllers,
    switches:cus.body.switches,
    host:cus.body.host,
    links:cus.body.links
  }
  
  // Aqui iría el comando para crear el script createScript();
 
}

function topolineal(lineal){
//Aquí va la recepción especifica de los parametros para correr los ejemplos y con eso va el script
}

function topotree(tree){
//Aquí va la recepción especifica de los parametros para correr los ejemplos y con eso va el script
}
