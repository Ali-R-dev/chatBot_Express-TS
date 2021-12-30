import moment from "moment";
moment().format();
// configure questions and their details here
const Questions = [
  {
    // params attribute is set if any data has to be fitted inside question
    question: (params: string) => {
      return "Hello! What’s your name?";
    },
    ans_Field: "name", // that tells in which field its ans going to save
    // for ans type authentication
    ans_type: (params: any) => {
      if (typeof params === "string" && params) return true;
      else return false;
    },
    // in case of error , this msg will be returned
    error_msg: (params: string) => {
      return "please Enter your name.";
    },
  },

  {
    question: (params: string) => {
      return `Hi, ${params}. What’s your birth date?`;
    },
    ans_Field: "dob",
    ans_type: (params: string) => {
      return moment(params, "YYYY-MM-DD", true).isValid();
    },
    error_msg: (params: string) => {
      return `Ohh, apologies ${params}, I don’t understand. Can you please specify your birthdate in YYYY-MM-DD format? Thanks!`;
    },
  },

  {
    question: (params: string) => {
      return "Nice! What insurance plan are you interested in? \\n A: Basic health insurance \\n B: Full health insurance \\n C: Full Health and dental insurance \\n Please answer A, B or C according to your choice.";
    },
    ans_Field: "insurance_plan",
    ans_type: (params: string) => {
      enum myEnum {
        "A",
        "B",
        "C",
      }
      if (Object.values(myEnum).includes(params)) {
        return true;
      }
      return false;
    },
    error_msg: (params: string) => {
      return "Sorry, can you please reply A, B or C depending on what insurance plan you wish to purchase? Thanks";
    },
  },
];
export default Questions;
