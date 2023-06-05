import mongoose from "mongoose";

const mobileSchema = mongoose.Schema({
  gender: { type: String },
});

const Mobile = mongoose.model("Mobiles", mobileSchema);

export default Mobile;
