import asyncHandler from "express-async-handler";
import Crime from "../models/crimeModel.js";

const crimeData = asyncHandler(async (req, res) => {
  try {
    const result = await Crime.find().exec();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

export { crimeData };
