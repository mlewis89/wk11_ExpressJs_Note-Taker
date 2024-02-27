//include external libraries
const express = require('express');
const path = require('path');
//create link to routing file
const api =  require('./routes/index.js');

//define port for use
const PORT =  process.env.PORT || 3001;
//create instance of express
const app = express();

//Add in middle wear 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create /api route
app.use('/api',api);

//create route to serve up public html documents
app.use(express.static('public'));

//create route for /notes to to serve up note page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});
 
//start the app on the specified prt
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);