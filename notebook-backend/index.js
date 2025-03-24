const connectMongo = require("./db");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;

app.use(cors({
  origin:"*"
}));
app.use(express.json());

app.get('/',(req,res)=>{
  res.status(200).json({status:"status connected"});
})

//Routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

connectMongo().then(()=>{
  app.listen(port, () => {
    console.log(`NoteBook server running on port ${port}`);
  });
});