import React, { useState } from "react";
import NoteContext from "../Context/NoteContext";
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const host = process.env.REACT_APP_HOST;
  const getNotes = async (date) => {
    const res = await fetch(`${host}/api/note/fetchNotes/${date}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const json = await res.json();
    if (res.status === 200) {
      setNotes(json.dateNotes);
    } else {
      setNotes([]);
    }
  };

  const addNote = async (note, date) => {
    const res = await fetch(`${host}/api/note/addNote/${date}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });
    const json = await res.json();
    if (res.status === 200) {
      console.log(json);
      getNotes(date);
    } else {
      alert("Something went wrong");
    }
  };

  const deleteNote = async (note) => {
    await fetch(`${host}/api/note/deleteNote/${note._id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    let newNoteSet = notes.filter((currNote) => {
      return currNote._id !== note._id;
    });
    setNotes(newNoteSet);
  };

  const editNote = async (note) => {
    let res = await fetch(`${host}/api/note/updateNote/${note.eid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        title: note.etitle,
        description: note.edescription,
        tag: note.etag,
      }),
    });
    let json = await res.json();
    console.log(json);
    let newNoteSet = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNoteSet.length; i++) {
      if (newNoteSet[i]._id === note.eid) {
        newNoteSet[i].title = note.etitle;
        newNoteSet[i].description = note.edescription;
        newNoteSet[i].tag = note.etag;
      }
    }
    console.log(newNoteSet);
    setNotes(newNoteSet);
  };
  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
