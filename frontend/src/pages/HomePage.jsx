import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false); //false: so u can see the page
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); //as soon as we reach the homepage, we'll try to fetch the note

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log("API Response:", res.data);
        console.log("Note array length: ", res.data?.length);

        setNotes(res.data || []); //ensure its always an array
        setIsRateLimited(false); //if its able to get data, it means no rate limited
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false); //stop loading regardless of success/failure
      }
    };
    fetchNotes();
  }, []);

  //debug logs
  console.log("Current state: ", { notes, loading, isRateLimited });

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10"> Loading note...</div>
        )}

        {/* Debug info - remove this after fixing 
        <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
          <p>Debug: Notes length: {notes?.length || 0}</p>
          <p>Debug: Loading: {loading.toString()}</p>
          <p>Debug: Rate limited: {isRateLimited.toString()}</p>
        </div>*/}

        {/* Show message when no notes */}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {/* Note grid */}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
