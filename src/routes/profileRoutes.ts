import { Router } from "express";
import { upload } from "../config/fileUpload";
import { gateKeeper } from "../middlewares/gate";
import { validateCreateProfileData } from "../middlewares/validateCreateProfileRequest";
import { createProfile, getProfiles, getProfile } from "../controllers/profileController";

const router = Router();

router.get("/", getProfiles);
router.get("/:id", getProfile);
router.post("/", [gateKeeper, upload.single("profile_picture"), validateCreateProfileData], createProfile);

export default router;
