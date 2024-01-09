import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import noteContext from "../Context/NoteContext";
import EditModal from "./EditModal";
import NoteItem from "./NoteItem";

export default function Calendar() {
  const contextVal = useContext(noteContext);
  const { notes, addNote, deleteNote, editNote, getNotes } = contextVal;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dateset = new Date();
  // let [currDate, setCurrDate] = useState(dateset.getDate());
  let [currMonth, setCurrMonth] = useState(dateset.getMonth());
  let [currYear, setCurrYear] = useState(dateset.getFullYear());
  let [datesBag, setDatesBag] = useState([]);
  const renderCalendar = (currMonth) => {
    let firstDayOfCurrMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfCurrMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfCurrMonth = new Date(currYear, currMonth + 1, 0).getDay();
    let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
    setDatesBag([]);
    //prevMonth
    for (let i = firstDayOfCurrMonth; i > 0; i--) {
      setDatesBag((datesBag) => [
        ...datesBag,
        { month: "prevMonth", date: lastDateOfPrevMonth - i + 1 },
      ]);
    }
    //currMonth
    for (let i = 1; i <= lastDateOfCurrMonth; i++) {
      setDatesBag((datesBag) => [...datesBag, { month: "currMonth", date: i }]);
    } //nextMonth
    for (let i = lastDayOfCurrMonth; i < 6; i++) {
      setDatesBag((datesBag) => [
        ...datesBag,
        { month: "nextMonth", date: i - lastDayOfCurrMonth + 1 },
      ]);
    }
  };
  useEffect(() => {
    renderCalendar(dateset.getMonth());
    getNotes(new Date().getDate() + "-" + (currMonth + 1) + "-" + currYear);

    // eslint-disable-next-line
  }, []);

  //modal functions
  const [currNote, setCurrNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [eNote, setENote] = useState({
    eid:"",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const onChange = (e) => {
    setCurrNote({ ...currNote, [e.target.id]: e.target.value });
  };

  const onChangeEval = (e) => {
    setENote({ ...eNote, [e.target.id]: e.target.value });
  };

  //ref
  const openAddModal = useRef(null);
  const closeAddModal = useRef(null);
  const editModalRef = useRef(null);
  const closeModalRef = useRef(null);

  const [dateClicked, setDateClicked] = useState(
    new Date().getDate() + "-" + (currMonth + 1) + "-" + currYear
  );
  //get all notes
  const getClickedDate = (e) => {
    getNotes(e.target.innerHTML + "-" + (currMonth + 1) + "-" + currYear);
    setDateClicked(e.target.innerHTML + "-" + (currMonth + 1) + "-" + currYear);
  };

  //add a new note
  const addNoteModal = (e) => {
    e.preventDefault();
    closeAddModal.current.click();
    addNote(currNote, dateClicked);
    setCurrNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  //delete a note
  const deleteNoteFunc = (note) => {
    deleteNote(note);
  };

  //edit a note
  const editNoteFunc = (note) => {
    setENote({
      eid:note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
    editModalRef.current.click();
  };
  const submitEnote = (e) => {
    e.preventDefault();
    closeModalRef.current.click();
    editNote(eNote);
  };

  return (
    <>
      <div className="containerArea">
        <div className="calendar">
          <div className="calHead btn-success btn">
            <h1>
              {months[currMonth]} {currYear}
            </h1>
            <div className="button_area">
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  let cm = currMonth - 1;
                  if (cm < 0 || cm > 11) {
                    dateset = new Date(currYear, cm);
                    setCurrYear(dateset.getFullYear());
                    cm = dateset.getMonth();
                  }
                  setCurrMonth(cm);
                  renderCalendar(cm);
                }}
              >
                arrow_back_ios
              </span>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  let cm = currMonth + 1;
                  if (cm < 0 || cm > 11) {
                    dateset = new Date(currYear, cm);
                    setCurrYear(dateset.getFullYear());
                    cm = dateset.getMonth();
                  }
                  setCurrMonth(cm);
                  renderCalendar(cm);
                }}
              >
                arrow_forward_ios
              </span>
            </div>
          </div>
          <div className="cal_container">
            <div className="calArea">
              <div className="days">
                <div className="day">Sun</div>
                <div className="day">Mon</div>
                <div className="day">Tue</div>
                <div className="day">Wed</div>
                <div className="day">Thurs</div>
                <div className="day">Fri</div>
                <div className="day">Sat</div>
              </div>
              <div className="cal">
                {datesBag.map((dates) => {
                  return (
                    <div
                      className={`date${
                        dates.month === "currMonth" ? "" : " inactiveDate"
                      }${
                        dates.date === new Date().getDate() &&
                        currMonth === new Date().getMonth() &&
                        currYear === new Date().getFullYear()
                          ? " activeDate"
                          : ""
                      }`}
                      key={uuid()}
                      onClick={(e) => {
                        if (dates.month === "currMonth") {
                          getClickedDate(e);
                        }
                      }}
                    >
                      {dates.date}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="notes_area">
              <div className="noteHead">
                <h1>
                  Notes <p className="h6 lead">{dateClicked}</p>
                </h1>
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    openAddModal.current.click();
                  }}
                >
                  add
                </span>
              </div>
              {notes.length === 0 ? "No notes found for this date" : ""}
              <div className="notesList">
              {notes.map((note) => {
                return (
                 <NoteItem note={note} editNoteFunc={editNoteFunc} deleteNoteFunc={deleteNoteFunc} key={note._id}/>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={openAddModal}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{color:"black"}}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeAddModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => addNoteModal(e)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    value={currNote.title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    aria-describedby="emailHelp"
                    value={currNote.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    aria-describedby="emailHelp"
                    value={currNote.tag}
                    onChange={onChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        editModalRef={editModalRef}
        closeModalRef={closeModalRef}
        eNote={eNote}
        onChangeEval={onChangeEval}
        submitEnote={submitEnote}
      />
    </>
  );
}
