const notes = require('express').Router();
const { v4: uuid4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

//GET Route for retrieving all the tips - jsn
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const  result = json.filter((note) => note.tip_id === tipID);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});


