//required all neccessary packages including express and files reffered to in code
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

//this is a get route for all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} this request has been successful`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// this is a get route for individually selected notes
notes.get('/:note_id', (req, res) => {
    const noteID = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const  product = json.filter((note) => note.tip_id === tipID);
        return product.length > 0
        ? res.json(product)
        : res.json('There is not a note with this ID');
    });
});

//this creates a post route for the new note
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

// this is a delete route for individually selected notes
notes.delete('/:note_id', (req, res) => {
    const noteID = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        //this creates a new array with all nites except for the one with the id selected to delete
        const product = json.filter((note) => note.id !== noteID);

        //this saves the new array to the file
        writeToFile('./db/db.json', product);

        // this string informs if the delte request was successful
        res.json(`This note ${noteID} has been removed`);
    });
});

//exported notes.js so it is accessible to the rest of the code
module.exports = notes;