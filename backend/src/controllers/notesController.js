import ratelimit from "../config/upstash.js";
import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //-1 will sort in desc order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    //if the server fails
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.erroe("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//if user want to create a note, they need to add the title n content of the note
export async function createNote(req, res) {
  try {
    const identifier = req.ip || req.connection.remoteAddress || "anonymous";
    console.log("Checking rate limit for:", identifier); // Debug log

    const { success, limit, reset, remaining } = await ratelimit.limit(
      identifier
    );

    if (!success) {
      console.log("Rate limit exceeded!"); // Debug log
      return res.status(429).json({
        message: "Slow down!! You're creating notes too fast",
        limit,
        remaining,
        resetTime: new Date(reset),
      });
    }

    console.log(`Rate limit passed. Remaining: ${remaining}/${limit}`); // Debug log

    const { title, content } = req.body;
    //console.log(title, content); //to access, add middleware at server.js (just before routes)
    const note = new Note({ title, content, createdAt: new Date() });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true, //give new note with updated field
      }
    );
    if (!updateNote) return res.status(404).json({ message: "Note not found" }); //404: not found

    res.status(200).json(updateNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
