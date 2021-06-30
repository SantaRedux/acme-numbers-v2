const { syncAndSeed, models: { Winner } } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/api/winners', async(req, res, next)=> {
  try {
    res.send(await Winner.findAll());
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

syncAndSeed();

app.listen(port, ()=> console.log(`listening on port ${port}`));
