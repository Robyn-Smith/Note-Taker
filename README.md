# Note-Taker




The application’s front end has already been created. It's your job to build the back end, connect the two, and then deploy the entire application to Heroku.

## Bonus

You haven’t learned how to handle DELETE requests, but this application offers that functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

* `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


# Description
This application allows the user to write and save notes. This is a useful application in createing to do lists, organising routines and setting important reminders for any user. The application uses Express.js back end to save and retrieve note data from a JSON file. 

When the user opens the page they are presented with a landing page with a link to a notes page. Once the user has clicked on the link on the notes page, they are presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text, in the right-hand column. Once the user enters a new note title and the note’s text, then a Save icon appears in the navigation at the top of the page. Once the save icon has been selected, then the new note that was entered is saved and appears, in the left-hand column with the other existing notes. If the user selects an existing note title in the list, in the left-hand column; that note appears in the right-hand column and the test is visable. If the user wishes to add a new note they should click on the Write icon (a plus symbol +) in the navigation at the top of the page. The user is then presented with empty fields to enter a new note title and the note’s text, in the right-hand column. If a user wants to delete a note they can click on the red bin symbol next to each individual note tile in the left-hand column.

