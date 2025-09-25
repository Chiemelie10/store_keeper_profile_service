import { Request, Response, NextFunction } from "express";
import { CreateProfileFieldError } from "../types/error";
import { CreateProfileData } from "../types/profile";
import { cleanInput, isValidPhoneNumber } from "../utils";

export const validateCreateProfileData = async (req: Request, res: Response, next: NextFunction) => {
    let { firstname, lastname, gender, phone, whatsapp }: CreateProfileData = req.body;

    let errors: CreateProfileFieldError = {};
    let firstnameErrors: string[] = [];
    let lastnameErrors: string[] = [];
    let genderErrors: string[] = [];
    let phoneErrors: string[] = [];
    let whatsappErrors: string[] = [];
    let profilePictureErrors: string[] = [];

    if (!firstname) {
        firstnameErrors.push("The field first name is required.");
        errors["firstname"] = firstnameErrors;
    }

    if (!lastname) {
        lastnameErrors.push("The field last name is required.");
        errors["lastname"] = lastnameErrors;
    }

    if (!gender) {
        genderErrors.push("The field gender is required.");
        errors["gender"] = genderErrors;
    }

    if (firstname) {
        firstname = cleanInput(firstname);

        if (firstname.length > 255) {
            firstnameErrors.push("First name exceeded 255 characters.");
            errors["firstname"] = firstnameErrors;
        }
    }

    if (lastname) {
        lastname = cleanInput(lastname);

        if (lastname.length > 255) {
            lastnameErrors.push("Last name exceeded 255 characters.");
            errors["lastname"] = lastnameErrors;
        }
    }

    if (gender) {
        if (gender != "male" && gender != "female") {
            genderErrors.push("Gender can either be male or male.");
            errors["gender"] = firstnameErrors;
        }
    }

    if (phone) {
        phone = cleanInput(phone);

        if (phone.length > 20) {
            phoneErrors.push("Phone number exceeded 20 characters.");
            errors["phone"] = phoneErrors;
        }

        if (!isValidPhoneNumber(phone)) {
            phoneErrors.push("Phone number is invalid.");
            errors["phone"] = phoneErrors;
        }
    }

    if (whatsapp) {
        whatsapp = cleanInput(whatsapp);

        if (whatsapp.length > 20) {
            whatsappErrors.push("WhatsApp number exceeded 20 characters.");
            errors["whatsapp"] = whatsappErrors;
        }

        if (!isValidPhoneNumber(whatsapp)) {
            whatsappErrors.push("WhatsApp number is invalid.");
            errors["whatsapp"] = whatsappErrors;
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    req.body.firstname = firstname;
    req.body.lastname = lastname;

    if (phone) {
        req.body.phone = phone;
    }

    if (whatsapp) {
        req.body.whatsapp = whatsapp;
    }

    next();
}