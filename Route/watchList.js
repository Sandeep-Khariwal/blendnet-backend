import express from "express";
import { creatWatchList, getAllWatchListStocks, removeWatchList } from "../Controller/watchList.js";

const router = express.Router()

router.route("/create").post(creatWatchList)
router.route("/remove").post(removeWatchList)
router.route("/getStocks").get(getAllWatchListStocks)

export default router