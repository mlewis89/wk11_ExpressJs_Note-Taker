const notes = require('express').Router();
const fs = require('fs');
const {readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req,res)=> {
    console.log(req.body);
    const {title,text} = req.body;
    if(req.body)
    {
       const newNote = {title, text}; 
       readAndAppend(newNote,'./db/db.json');
       res.json('note added succesfully');
    }
    else{
        res.errored('error in adding note');
    }
    
})

module.exports =  notes;