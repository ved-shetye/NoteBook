const connectMongo = require("./db");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.listen(port,()=>{
  console.log(`NoteBook server running on port ${port}`);
})

connectMongo();