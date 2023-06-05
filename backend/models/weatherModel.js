import mongoose from "mongoose";

const weatherSchema = mongoose.Schema({
  date: { type: String },
  temp_max: { type: String },
});

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
