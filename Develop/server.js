const express = require('express');
const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/api/notes',(req,res)=>{
  res.sendFile(path.join(__dirname, 'db/db.json'));
});

app.post('/api/notes',(req,res)=>{
    // incread id by one from last id element
    req.body.id = notes[notes.length-1].id+1;
    notes.push(req.body);
    
    fs.writeFile('db/db.json',JSON.stringify(notes, null, 2), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

app.listen(PORT,() => console.log(`Listening to your command in ${PORT}`));