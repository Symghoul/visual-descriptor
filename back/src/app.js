const express = require('express');
const cors = require('cors');
const app = express();

//settings

app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

//routes
app.get('/', (_req, res) => {
    res.send('Hello World!')
})
app.use('/api/controllers', require('./routes/controllers'))
app.use('/api/switches', require('./routes/switches'))
app.use('/api/hosts', require('./routes/hosts'))
app.use('/api/links', require('./routes/links'))
app.use('/api/export', require('./routes/general'))


module.exports = app;