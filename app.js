import express from "express";
import morgan from "morgan";
import cors from "cors";
import errorhandler from "./middlewares/errorHandler.js";
import connectDatabase from "./db/connectDatabase.js";
import { ValidationError } from "sequelize"; 

import contactsRouter from "./routes/contactsRouter.js";
import "dotenv/config";

const {DB_HOST, PORT = 3000} = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use(errorhandler);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if(err instanceof ValidationError) {
    err.status = 400;
  }

  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

await connectDatabase()
  .then(()=> {
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });    
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })