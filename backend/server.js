import env from "dotenv";
import express from "express";
import mcqRoutes from "./routes/mcq.route.js";
import flashCardRoutes from "./routes/flashCard.route.js";
import genAiRoutes from "./routes/genAi.route.js";
import cors from "cors";
// path is for you to get the path of the directory
import path from "path";

env.config();

const app = express();
const PORT = process.env.PORT || 3000;

// cors added to allow cross origin requests
app.use(cors());

const __dirname = path.resolve();

// for json data in body
app.use(express.json());

app.use("/api/mcq", mcqRoutes);
app.use("/api/flashCard", flashCardRoutes);
app.use("/api/generate", genAiRoutes);

// here we are trying to make out dist folder that we will get on build of the frontend through 
// as our static assets files 
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"/frontend/dist")));

  // except the api routes any thing asked from the backend then
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
  })
}


app.listen(PORT, () => {
  console.log("server started at http:localhost:",PORT);
});
