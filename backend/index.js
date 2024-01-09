const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log(e));

const app = express();
const port = 4321;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/user/", require("./routes/UserRoute"));
app.use("/api/note/", require("./routes/NotesRoute"));

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
