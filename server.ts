import express, { Request, Response, NextFunction } from "express";
import config from "config";
import connect from "./db/connect";
import router from "./routes/route";
import parsePhoneNumber from "libphonenumber-js";

const port = config.get("port");

const app = express();

//------Middlewares--------
app.use(express.json());

//validation for phone number
app.use((req, res, next) => {
  const { number } = req.body;
  const phoneNumber = parsePhoneNumber(number, "ES");
  if (phoneNumber && phoneNumber.isValid()) {
    next();
  } else {
    res.status(400).json({
      message: "Invalid number. Please send a valid spanish phone number.",
    });
  }
});
app.use("/", router);
//---------------------------

// connect to db and launch server afterword
connect().then(
  () => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  },
  () => {
    console.log("cannot start server...");
  }
);
