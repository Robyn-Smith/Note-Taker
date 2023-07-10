# Note-Taker

# Description
This application allows the user to write and save notes. This is a useful application in createing to do lists, organising routines and setting important reminders for any user. The application uses Express.js back end to save and retrieve note data from a JSON file. 

When the user opens the page they are presented with a landing page with a link to a notes page. Once the user has clicked on the link on the notes page, they are presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text, in the right-hand column. Once the user enters a new note title and the note’s text, then a Save icon appears in the navigation at the top of the page. Once the save icon has been selected, then the new note that was entered is saved and appears, in the left-hand column with the other existing notes. If the user selects an existing note title in the list, in the left-hand column; that note appears in the right-hand column and the test is visable. If the user wishes to add a new note they should click on the Write icon (a plus symbol +) in the navigation at the top of the page. The user is then presented with empty fields to enter a new note title and the note’s text, in the right-hand column. If a user wants to delete a note they can click on the red bin symbol next to each individual note tile in the left-hand column.

# Installation
The user will have to navigate to the terminal and enter:

```
npm i
```
This will install the necessary node packages needed for this application including Express.js

# Usage
The user can either type:
```
npm run start
```
in the terminal and click on the http://localhost:3001 link or navigate to this URL in their browser. They will be greeted with a welcome page with the option "get started". Once clicked, this will redirect the user to the main page where they can enter their notes, view the n
