const notes = require("express").Router();
const fs = require("fs");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const newNote = { title, text, id: uuid() };
    readAndAppend(newNote, "./db/db.json");
    res.json("note added succesfully");
  } else {
    res.json("error in adding note");
  }
});

notes.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id !== null && id !== undefined) {
    const d = [];
    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((data) => {
        return data.filter((x) => x.id !== id);
      })
      .then((data) => {
        console.log("saving to file", data);
        writeToFile('./db/db.json',data);
        res.json(data);
      })
      .catch((error)=>res.json(error));
  }
  else
  {
    res.json("No ID received");
    console.log('no note id')
  }
});

module.exports = notes;
