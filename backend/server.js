import env from "dotenv";
import express from "express";
import mcqRoutes from "./routes/mcq.route.js";
import flashCardRoutes from "./routes/flashCard.route.js";
import genAiRoutes from "./routes/genAi.route.js";
import cors from "cors";


env.config();

const app = express();
const PORT = process.env.PORT || 3000;

// cors added to allow cross origin requests
app.use(cors());



// for json data in body
app.use(express.json());

app.use("/api/mcq", mcqRoutes);
app.use("/api/flashCard", flashCardRoutes);
app.use("/api/generate", genAiRoutes);



app.listen(PORT, () => {
  console.log("server started at http:localhost:",PORT);
});
