//create instanceof express router
const router = require('express').Router();
//configure route for /api/notes
const notesRouter = require('./notes');
//create instance of route
router.use('/notes', notesRouter);
//export for extnal use
module.exports = router