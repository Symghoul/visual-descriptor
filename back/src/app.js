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
app.use('/api/controllers', require('./routes/controllers'))    //API Rest for the controllers
app.use('/api/switches', require('./routes/switches'))          //API Rest for the switches
app.use('/api/hosts', require('./routes/hosts'))                //API Rest for the hosts
app.use('/api/links', require('./routes/links'))                //API Rest for the links
app.use('/api/general', require('./routes/general'))            // Route for any resource who needs more than one Api Rest
app.use('/api/services/', require('./routes/services'))         //Route for services as DHCP and MAC chooser

module.exports = app;