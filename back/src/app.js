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
app.get('/api/controllers', (_req, res) => {
    
})


module.exports = app;