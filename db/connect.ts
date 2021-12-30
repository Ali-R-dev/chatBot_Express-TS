import mongoose from "mongoose";
import config from "config";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    console.log("connected to db...");
  } catch (error) {
    console.log("could not connect to db");
    throw error;
  }
};
export default connect;
