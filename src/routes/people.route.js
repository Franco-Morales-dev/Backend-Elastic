import { Router } from "express";
import { 
    deleteOneByIdFromElastic, 
    getAllFromElastic, 
    getOneByIdFromElastic, 
    persistDataInElastic,
    searchInElastic,
    updateOneByIdFromElastic 
} from "../controllers/people.controller";

const router = Router();

router.get("/ea/:id", getOneByIdFromElastic);
router.get("/ea", getAllFromElastic);

router.post("/ea/search", searchInElastic);

router.post("/ea", persistDataInElastic);
router.put("/ea/:id", updateOneByIdFromElastic);
router.delete("/ea/:id", deleteOneByIdFromElastic);

export default router;