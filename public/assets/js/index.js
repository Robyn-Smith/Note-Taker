let noteTitle;
let noteText;
let saveBtn;
let addNoteBtn;
let List;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveBtn = document.querySelector('.save-note');
  addNoteBtn = document.querySelector('.new-note');
  List = document.querySelectorAll('.list-container .list-group');
}

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
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

const renderActiveNote = () => {
  hide(saveBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
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
    renderActiveNote();
  });
};

// Delete the clicked note
const NoteDelete = (event) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const ViewNotes = (event) => {
  event.preventDefault();
  activeNote = JSON.parse(event.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const ViewNewNote = (event) => {
  activeNote = {};
  renderActiveNote();
};

// display an element
const display = (element) => {  element.style.display = 'inline';};

// Hide an element
const hide = (element) => { element.style.display = 'none';};

const generateSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveBtn);
  } else {
    display(saveBtn);
  }
};

// Render the list of note titles
const renderList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    List.forEach((el) => (el.innerHTML = ''));
  }

  let ListItems = [];

  // Returns HTML element with or without a delete button
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

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderList);

if (window.location.pathname === '/notes') {
  saveBtn.addEventListener('click', SaveNote);
  addNoteBtn.addEventListener('click', ViewNewNote);
  noteTitle.addEventListener('keyup', generateSaveBtn);
  noteText.addEventListener('keyup', generateSaveBtn);
}

getAndRenderNotes();
