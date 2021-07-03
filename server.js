const express = require('express');
const notes = require('./Develop/db/db.json')
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('Develop/public'));

app.get('/notes',(req,res)=>{
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

app.get('/api/notes',(req,res)=>{
  res.json(notes);
});

app.get('/api/notes/:id',(req,res)=>{
  selectID = parseInt(req.params.id);
  const foundId = notes.find(element => element.id === selectID);

  res.json(foundId);
});

app.post('/api/notes',(req,res)=>{
    if (notes.length === 0) {
      req.body.id =1;
    } else {
      // incread id by one from last id element
      req.body.id = notes[notes.length-1].id+1;
    }
    notes.push(req.body);

    fs.writeFile('Develop/db/db.json',JSON.stringify(notes, null, 2), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.delete('/api/notes/:id', function (req, res) {
    selectID = parseInt(req.params.id);
    foundId = notes.find(element => element.id === selectID)

    notes.splice(notes.indexOf(foundId), 1);
    fs.writeFile('Develop/db/db.json',JSON.stringify(notes, null, 2), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
})

app.listen(PORT,() => console.log(`Listening to your command in ${PORT}`)); 