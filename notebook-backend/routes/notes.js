const express = require("express");
const router = express.Router();
const fetchUserData = require("../middleware/fetchUserData");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1 Get all notes using:GET "/api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchUserData, async (req, res) => {
  try {
    //using user id we added in every note of our note collection we traverse all of them to find notes with the user id and return them
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 Add a new note using:POST "/api/notes/addnote".Login required
router.post(
  "/addnote",
  fetchUserData,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let currentDate = new Date();
      currentDate = currentDate.toLocaleDateString();
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
        date:currentDate
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//ROUTE 3 Update an existing note using:PUT "/api/notes/updatenote".Login required
router.put(
   "/updatenote/:id",
   fetchUserData,
   async (req, res) => {
     try {
       const { title, description, tag } = req.body;
      //Create a newNote object
       const newNote = {};
       if (title) {
         newNote.title=title;
       }
       if (description) {
         newNote.description=description;
       }
       if (tag) {
         newNote.tag=tag;
       }

      //find the note to be updated and update it
       let note = await Note.findById(req.params.id);
       if (!note) {
        return res.status(404).send("Note not found");
       }
       //allow to update operation only when user owns the Note
       if (note.user.toString()!==req.user.id) {
         return res.status(401).send("Not Allowed")
       }
       note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
       res.json({note});

     } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal Server Error");
     }
   }
 );


//ROUTE 4 Delete an existing note using:DELETE "/api/notes/deletenote".Login required
router.delete(
   "/deletenote/:id",
   fetchUserData,
   async (req, res) => {
     try {
      //find the note to be deleted and delete it
       let note = await Note.findById(req.params.id);
       if (!note) {
        return res.status(404).send("Note not found");
       }
       //allow delete operation when user own the Note
       if (note.user.toString()!==req.user.id) {
         return res.status(401).send("Not Allowed")
       }
       note = await Note.findByIdAndDelete(req.params.id);
       res.json({"Success":"Note has been deleted,",note:note});
     } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal Server Error");
     }
   }
 );
module.exports = router;