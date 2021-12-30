import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  number: String,
  name: String,
  dob: String,
  insurance_plan: String,
});
export default mongoose.model("User", UserSchema);
