import { Router } from "express";
import { upload } from "../config/fileUpload";
import { gateKeeper } from "../middlewares/gate";
import { validateCreateProfileData } from "../middlewares/validateCreateProfileRequest";
import { createProfile, getProfiles, getProfile, getAuthProfile, updateProile, sendProfilePicture, removeProfilePicture } from "../controllers/profileController";
import { validateSendProfilePictureData } from "../middlewares/validateSendProfilePicture";

const router = Router();

router.get("/", gateKeeper, getProfiles);
router.get("/auth", gateKeeper, getAuthProfile);
router.get("/:id", gateKeeper, getProfile);
router.post("/", [gateKeeper, validateCreateProfileData], createProfile);
router.put("/:id", [gateKeeper, validateCreateProfileData], updateProile);
router.patch("/:id/upload/picture", [gateKeeper, upload.single("profile_picture"), validateSendProfilePictureData], sendProfilePicture);
router.patch("/:id/remove/picture", [gateKeeper, upload.single("profile_picture")], removeProfilePicture);

export default router;
