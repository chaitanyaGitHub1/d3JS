import asyncHandler from "express-async-handler";
import Movie from "../models/movieModel.js";


const moviePerYearData = asyncHandler(async (req, res) => {
  // const { email, password } = req.body;
  try {
    const data = await Movie.aggregate([
      {
        $match: {
          released: {
            $gte: new Date("2010-01-01"),
            $lt: new Date("2012-01-01"),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$released" },
            month: { $month: "$released" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    console.log(data);
    // setData(data); // Set the data in the component's state
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

export { moviePerYearData };
