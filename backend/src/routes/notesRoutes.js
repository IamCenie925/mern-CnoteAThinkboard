import express from "express";
import {
  deleteNote,
  getNoteById,
  createNote,
  getAllNotes,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

//endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource
//API endpoint (Application Programming Interfeace endpoint).
// a route is a set of rules that defines how an application responds to a client's request to a particular endpoint
// a route is a part of an API

//these below 4 code blocks are examples of API routes written in javascript using framework express.js.
//each block defines a specific route that handle a different type of http request (Get, post, put, delete).
// (http request is a message sent by a client (like a web browser) to a server to ask for an action)

/*app.get("/api/notes", (req, res) => {
    res.status(200).send("you got 10 notes"); //200: OK!
});

app.post("/api/notes", (req, res) => {
    res.status(201).json({message:"Note created successfully!"}) //201: something created!
})

app.put("/api/notes/:id", (req, res) => { //put: update smth 
    res.status(200).json({message:"Note updated successfully!"})
})

app.delete("/api/notes/:id", (req, res) => { //put: update smth 
    res.status(200).json({message:"Note deleted successfully!"})
})

//http://localhost:5001/api/notes/21
*/
