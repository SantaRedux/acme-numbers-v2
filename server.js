const { syncAndSeed, models: { Winner } } = require('./db');
const express = require('express');
const app = express();
const path = require('path');


app.use(express.json());
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

app.post('/api/winners', async(req, res, next)=> {
  try {
    res.status(201).send(await Winner.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/winners/:id', async(req, res, next)=> {
  try {
    const winner = await Winner.findByPk(req.params.id);
    await winner.update(req.body);
    res.send(winner);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/winners/:id', async(req, res, next)=> {
  try {
    res.send(await Winner.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/winners/:id', async(req, res, next)=> {
  try {
    const winner = await Winner.findByPk(req.params.id);
    await winner.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

syncAndSeed();

app.listen(port, ()=> console.log(`listening on port ${port}`));
