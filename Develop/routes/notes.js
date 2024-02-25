//include express router
const notes = require("express").Router();
//include file system
const fs = require("fs");
//include helpers
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

//GET method to return current notes in the 'database'
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST methood to add a new note to the 'database'
notes.post("/", (req, res) => {
  console.log(req.body);
  
  const { title, text } = req.body;
  //check the body of the request is not empty
  if (req.body) {
    //create new note object.
    const newNote = { title, text, id: uuid() };
    //append new note to 'database' file
    readAndAppend(newNote, "./db/db.json");
    res.json("note added succesfully");
  } else {
    res.json("error: body required for POST method");
  }
});

//DELETE method - to delete a note form the 'database' file
notes.delete("/:id", (req, res) => {
  //save the data within the path paramether to variable 'id'
  const id = req.params.id;
  //check that id passed, in not empty
  if (id !== null && id !== undefined) {
    const d = [];
    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((data) => {
        return data.filter((x) => x.id !== id);
      })
      .then((data) => {
        //if new data leaves the array empty
        if(data.length > 0)
        {
          console.log("saving to file", data);
          writeToFile('./db/db.json',data);
          res.json(data);
        }else
        {
          data = [];
          writeToFile('./db/db.json',data);
          res.json(data);
        }
      })
      .catch((error)=>res.json(error));
  }
  else
  {
    res.json("No ID received");
    console.log('no note id')
  }
});
//export note routes for external use
module.exports = notes;
