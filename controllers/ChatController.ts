import { Request, Response } from "express";
import User from "../db/Schemas/User_Schema";
import Questions from "../config/config_questions";

interface user {
  number: string;
  name: string;
  dob: string;
  insurance_plan: string;
  instance_life: Date; // for timeout
  question_no: number; // to keep track of current question
}
let data: user[] = [];

const ChatController = (req: Request, res: Response) => {
  const { number, message }: { number: string; message: string } = req.body;
  //    check if it is a new user in chatting array
  if (!data.find((n) => n.number === number)) {
    //   push new user into chatting array
    data.push({
      number: number,
      name: "",
      dob: "",
      insurance_plan: "",
      instance_life: new Date(),
      question_no: 0,
    });
    res.json({ message: Questions[0].question("") });
    return;
  }
  //      index of user
  let indexOfUser: number = data.findIndex((n) => n.number === number);
  data[indexOfUser].instance_life = new Date();
  //      check if message is a valid answer
  if (Questions[data[indexOfUser].question_no].ans_type(message)) {
    //    update user info baed on answer
    data[indexOfUser] = {
      ...data[indexOfUser],
      [Questions[data[indexOfUser].question_no].ans_Field]: message,
    };
    //    increment current question no
    data[indexOfUser].question_no++;
    //    chek if all questions have been asked
    if (Questions.length === data[indexOfUser].question_no) {
      //  saving record to DB
      User.findOneAndUpdate(
        { number: data[indexOfUser].number },
        {
          number: data[indexOfUser].number,
          name: data[indexOfUser].name,
          dob: data[indexOfUser].dob,
          insurance_plan: data[indexOfUser].insurance_plan,
        },
        { upsert: true, new: true },
        (err, doc) => {
          if (err) {
            res.json({ message: "error", error: err });
            return;
          }
          data.splice(indexOfUser, 1);
          res.json({ message: "Thanks. Your request has been saved..." });
          return;
        }
      );
      //  remove user from server memory
    } else {
      //  next question as response message
      res.json({
        message: Questions[data[indexOfUser].question_no].question(
          data[indexOfUser].name
        ),
      });
    }
  } else {
    //  error response message in case of invalid answer
    res.json({
      message: Questions[data[indexOfUser].question_no].error_msg(
        data[indexOfUser].name
      ),
    });
  }
};

//  timeout to remove records from data which are not being interacted after specific time interval
setInterval(() => {
  data.forEach((user, index) => {
    // @ts-ignore
    if (new Date() - 20000 > user.instance_life) {
      data.splice(index, 1);
    }
  });
}, 5000);

export default ChatController;
