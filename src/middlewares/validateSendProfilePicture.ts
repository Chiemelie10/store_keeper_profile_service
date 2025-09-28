import {Request, Response, NextFunction} from "express";
import { SendProfilePictureFieldError } from "../types/error";

export const validateSendProfilePictureData = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    let errors: SendProfilePictureFieldError = {};
    let profilePictureErrors: string[] = [];

    if (file) {
        if (file.fieldname != "profile_picture" || file.size === 0) {
            profilePictureErrors.push("The field profile picture is required.");
            errors["profile_picture"] = profilePictureErrors;
        }

        // if (file.fieldname === "profile_picture" && file.size > 5 * 1024 * 1024) {
        //     profilePictureErrors.push("File size is greater than 5 MB.");
        //     errors["profile_picture"] = profilePictureErrors;
        // }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    next();
}