const mongoose = require('mongoose');


const URI = process.env.MONGODB_URI 
? process.env.MONGODB_URI:
'mongodb://127.0.0.1:22700/databasetest';

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('DB is connected');
});