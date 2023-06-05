import express from "express";
import { moviePerYearData } from "../controllers/movieController.js";
import { weatherData } from "../controllers/weatherController.js";
import { crimeData } from "../controllers/crimeController.js";
import { mobileData } from "../controllers/mobileController.js";

const dataRouter = express.Router();

dataRouter.get("/movies/yearly", moviePerYearData);
dataRouter.get("/weather", weatherData);
dataRouter.get("/crimes", crimeData);
dataRouter.get("/mobile", mobileData);

export default dataRouter;
