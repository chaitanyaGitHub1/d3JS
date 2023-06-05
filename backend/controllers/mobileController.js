import asyncHandler from "express-async-handler";
import Mobile from "../models/mobileModel.js";

const mobileData = asyncHandler(async (req, res) => {
  try {
    const ageGroups = await Mobile.aggregate([
      {
        $group: {
          _id: null,
          below25: { $sum: { $cond: [{ $lt: ["$age", 25] }, 1, 0] } },
          above25Below50: {
            $sum: {
              $cond: [
                { $and: [{ $gte: ["$age", 25] }, { $lt: ["$age", 50] }] },
                1,
                0,
              ],
            },
          },
          above50Below75: {
            $sum: {
              $cond: [
                { $and: [{ $gte: ["$age", 50] }, { $lt: ["$age", 75] }] },
                1,
                0,
              ],
            },
          },
          above75: { $sum: { $cond: [{ $gte: ["$age", 75] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          below25: 1,
          above25Below50: 1,
          above50Below75: 1,
          above75: 1,
        },
      },
    ]);

    if (ageGroups.length > 0) {
      res.json(ageGroups[0]);
    } else {
      res.json({
        below25: 0,
        above25Below50: 0,
        above50Below75: 0,
        above75: 0,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { mobileData };
