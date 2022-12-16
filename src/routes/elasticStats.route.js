import { Router } from "express";
import { elasticSearchInfo } from "../controllers/elastic.controller";

const router = Router();

router.get("/info", elasticSearchInfo);

export default router;