import express from "express"; //const express = require("express")
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config(); //call this method to properly use .env

const app = express();
const PORT = process.env.PORT || 5001; //if false or undefined, can get 5001 instead
const __dirname = path.resolve();

//middleware, a function runs in the middle between the request and the respond (before server response to client)
if (process.env.NODE_ENV != "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter); //check for rate limiting if user can send a req or should we send an error res

//my simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

//routes
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  //once database connected, run the application
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

//mongodb+srv://ntxuannhi9205_db_user:RgMZi2SnxfJayONe@cluster0.vng1yim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
