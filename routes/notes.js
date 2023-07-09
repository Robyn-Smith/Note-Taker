const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

//GET Route for retrieving all the tips - jsn
notes.get('/', (req, res) => {
    console.info(`${req.method} this request has been successful`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip- jusn
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const  product = json.filter((note) => note.tip_id === tipID);
        return product.length > 0
        ? res.json(product)
        : res.json('There is not a note with this ID');
    });
});

// DELETE Route for a specific tip - jsn
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        //make a new array of all notes except the one with the ID provided in the URL = jsn
        const product = json.filter((note) => note.id !== noteId);

        //save that array to the filesystem - jsn
        writeToFile('./db/db.json', product);

        // respond to the DELETE request -jsn
        res.json(`This note ${noteId} has been removed`);
    });
});

//POST Route for a new UX/UI note - jsn
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`This note has successfully been added`);
    } else {
        res.error('There was an error');
    }
});

module.exports = notes;