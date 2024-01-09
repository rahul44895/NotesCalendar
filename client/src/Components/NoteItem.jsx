import React from "react";

export default function NoteItem(props) {
  const { note, editNoteFunc, deleteNoteFunc } = props;
  return (
    <>
      <div className="card my-1" style={{ width: "100%" }}>
        <div className="card-body position-relative">
          <div>
            <h5 className="card-title">{note.title}</h5>
            <h6 className="card-subtitle text-body-secondary ">{note.tag}</h6>
            <p className="card-text">
              {note.description.length > 80
                ? note.description.slice(0, 80) + "..."
                : note.description}
            </p>
          </div>
          <div className="noteItemButton">
            <button
              className="btn btn-success m-1"
              onClick={() => {
                alert(
                  "Title : " +
                    note.title +
                    "\n" +
                    "Description : " +
                    note.description +
                    "\n" +
                    "Tag : " +
                    note.tag
                );
              }}
            >
              View
            </button>
            <button
              className="btn btn-success m-1"
              onClick={() => {
                editNoteFunc(note);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-success m-1"
              onClick={() => {
                deleteNoteFunc(note);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
