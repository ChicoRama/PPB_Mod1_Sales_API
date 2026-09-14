import express from "express";
import { RestockController } from "../controllers/restockController.js";

const router = express.Router();

router.post("/", RestockController.create);
router.get("/", RestockController.getAll);

export default router;