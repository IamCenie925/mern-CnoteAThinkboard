import mongoose from "mongoose";

//1st step: create a schema
//2nd step: create a model based off of that schema

//schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //createdAt, updatedAt, app timestamp whenever create or update
);

//model
const Note = new mongoose.model("Note", noteSchema); //create a note model based on its model (each has title, content, and timestamp)

export default Note;
