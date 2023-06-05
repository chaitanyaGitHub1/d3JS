import mongoose from "mongoose";

const crimeSchema = mongoose.Schema({
  state: { type: String },
});

const Crime = mongoose.model("Crimes", crimeSchema);

export default Crime;
