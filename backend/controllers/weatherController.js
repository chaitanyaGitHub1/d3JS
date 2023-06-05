import asyncHandler from "express-async-handler";
import Weather from "../models/weatherModel.js";

const weatherData = asyncHandler(async (req, res) => {
  try {
    const data = await Weather.aggregate([
        {
          $addFields: {
            date: { $toDate: "$date" },
          },
        },
        {
          $match: {
            date: { $gte: new Date("2015-01-01"), $lt: new Date("2016-01-01") }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" },
            },
            maxTemp: { $max: "$temp_max" },
          },
        },
      ]);
    console.log(data);
    // setData(data); // Set the data in the component's state
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

export { weatherData };
