import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import Home from "./Components/Home";
import NoteState from "./Context/NoteState";
import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";
import About from "./Components/About";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
