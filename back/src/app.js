const express = require('express');

const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();


//settings

app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/load',
    safeFileNames: true,
    preserveExtension: 4

}))

//routes
app.get('/', (_req, res) => {
    res.send('Hello World!')
})
app.use('/api/controllers', require('./routes/controllers'))
app.use('/api/switches', require('./routes/switches'))
app.use('/api/hosts', require('./routes/hosts'))
app.use('/api/links', require('./routes/links'))
app.use('/api/general', require('./routes/general'))
app.use('/api/services/', require('./routes/services'))   
//Necesito que me mandes una dirección ip y una mascara {"ip":###, "mask":"####"}
/*
app.use(`/test/:valor`, (req, res)=>{
    //Dirección IP
    let valor = req.params.valor
    let split = valor.split(".")

    //Dirección mac
})
*/

module.exports = app;