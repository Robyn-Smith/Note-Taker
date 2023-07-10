//global varables accessible throughout the code
let noteTitle;
let noteText;
let addNoteBtn;
let saveBtn;
let List;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  addNoteBtn = document.querySelector('.new-note');
  saveBtn = document.querySelector('.save-note');
  List = document.querySelectorAll('.list-container .list-group');
}

// currentNote is used to monitor the current note in the textarea (text on the right-hand side of the page)
let currentNote = {};

const getAll = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const rendercurrentNote = () => {
  hide(saveBtn);

  if (currentNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = currentNote.title;
    noteText.value = currentNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const SaveNote = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    rendercurrentNote();
  });
};

// this deletes the selected note
const NoteDelete = (event) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked -jsn
  event.stopPropagation();

  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (currentNote.id === noteId) {
    currentNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    rendercurrentNote();
  });
};

// this turns currentNote into text from JSON data and displays it
const ViewNotes = (event) => {
  event.preventDefault();
  currentNote = JSON.parse(event.target.parentElement.getAttribute('data-note'));
  rendercurrentNote();
};

// this makes sure the current note is an empty object so that the user can enter their own text 
const ViewNewNote = (event) => {
  currentNote = {};
  rendercurrentNote();
};

// this variable has been created to show the save button element
const display = (element) => {  element.style.display = 'inline';};

// this variable has been created to hide the save button element
const hide = (element) => { element.style.display = 'none';};

const generateSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveBtn);
  } else {
    display(saveBtn);
  }
};

// this renders the list of note titles in the left-hand column
const renderList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    List.forEach((el) => (el.innerHTML = ''));
  }

  let ListItems = [];

  // this creates the html list with a delete button
  const createList = (text, delBtn = true) => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-group-item');

    const divEl = document.createElement('div');
    divEl.classList.add('list-item-title');
    divEl.innerText = text;
    divEl.addEventListener('click', ViewNotes);

    listElement.append(divEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', NoteDelete);

      listElement.append(delBtnEl);
    }

    return listElement;
  };

  if (jsonNotes.length === 0) {
    ListItems.push(createList('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createList(note.title);
    li.dataset.note = JSON.stringify(note);

    ListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    ListItems.forEach((note) => List[0].append(note));
  }
};

// this retrieves the notes from the database and renders them into the left-hand sidebar
const getAndRenderNotes = () => getAll().then(renderList);

if (window.location.pathname === '/notes') {
  saveBtn.addEventListener('click', SaveNote);
  addNoteBtn.addEventListener('click', ViewNewNote);
  noteTitle.addEventListener('keyup', generateSaveBtn);
  noteText.addEventListener('keyup', generateSaveBtn);
}

getAndRenderNotes();
