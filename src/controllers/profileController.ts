import { Request, Response } from "express";
import { CreateProfileData } from "../types/profile";
import { AppDataSource } from "../config/data-source";
import { Profile } from "../entity/Profile";
import { now } from "../utils";
import { UUID } from "crypto";
import { UpdateResult } from "typeorm";

export const getProfiles = async (req: Request, res: Response) => {
    const profiles = await AppDataSource.getRepository(Profile)
    .createQueryBuilder("profiles")
    .select([
        "profiles.id", "profiles.user_id", "profiles.firstname",
        "profiles.lastname", "profiles.gender", "profiles.phone",
        "profiles.whatsapp", "profiles.profile_picture"
    ])
    .getMany()

    return res.status(200).json({
        message: "Profiles fetched successfully.",
        data: profiles
    });
}

export const getProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    const profile = await AppDataSource.getRepository(Profile)
        .createQueryBuilder("profiles")
        .select([
            "profiles.id", "profiles.user_id", "profiles.firstname",
            "profiles.lastname", "profiles.gender", "profiles.phone",
            "profiles.whatsapp", "profiles.profile_picture"
        ])
        .where("profiles.id = :id", { id })
        .getOne();

    if (!profile) {
        return res.status(404).json({
            error: "Profile was not found."
        });
    }

    return res.status(200).json({
        message: "Profile fetched successfully.",
        data: profile
    });
}

export async function getAuthProfile(req: Request, res: Response) {
    const authUserId = req.get("x-user-id");

    const profile = await AppDataSource.getRepository(Profile)
        .createQueryBuilder("profiles")
        .select([
            "profiles.id", "profiles.user_id", "profiles.firstname",
            "profiles.lastname", "profiles.gender", "profiles.phone",
            "profiles.whatsapp", "profiles.profile_picture"
        ])
        .where("profiles.user_id = :user_id", { user_id: authUserId })
        .getOne()

    if (!profile) {
        return res.status(404).json({
            error: "Profile was not found."
        });
    }

    return res.status(200).json({
        message: "Profiles fetched successfully.",
        data: profile
    });
}

export const createProfile = async (req: Request, res: Response) => {
    const userId = req.get("x-user-id") as UUID;
    const file = req.file;
    const { firstname, lastname, gender, phone, whatsapp }: CreateProfileData = req.body;

    const currentTime = now();

    try {
        const profile = await AppDataSource.manager
            .save(Profile, {
                user_id: userId,
                firstname,
                lastname,
                gender,
                phone,
                whatsapp,
                profile_picture: file.path,
                created_at: currentTime,
                updated_at: currentTime
            });

        const responseData = {
            id: profile.id,
            user_id: profile.user_id,
            firstname: profile.firstname,
            lastname: profile.lastname,
            gender: profile.gender,
            phone: profile.phone,
            whatsapp: profile.whatsapp,
            profile_picture: profile.profile_picture ? `${req.protocol}://${req.get("host")}${profile.profile_picture}` : profile.profile_picture,
        };

        return res.status(200).json({
            message: "Profile fetched successfully.",
            data: responseData
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function updateProile(req: Request, res: Response) {
    const { id } = req.params;
    const { firstname, lastname, gender, phone, whatsapp }: CreateProfileData = req.body;

    const currentTime = now();

    await AppDataSource.manager.update(
        Profile,
        { id },
        { firstname, lastname, gender, phone, whatsapp, updated_at: currentTime
    });

    const profile = await AppDataSource.getRepository(Profile)
        .createQueryBuilder("profiles")
        .select([
            "profiles.id", "profiles.user_id", "profiles.firstname",
            "profiles.lastname", "profiles.gender", "profiles.phone",
            "profiles.whatsapp", "profiles.profile_picture"
        ])
        .where("profiles.id = :id", { id })
        .getOne()

    const responseData = {
        id: profile.id,
        user_id: profile.user_id,
        firstname: profile.firstname,
        lastname: profile.lastname,
        gender: profile.gender,
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        profile_picture: profile.profile_picture ? `${req.protocol}://${req.get("host")}${profile.profile_picture}` : profile.profile_picture,
    };

    return res.status(200).json({
        message: "Profile updated successfully.",
        data: responseData
    });
}

export async function sendProfilePicture(req: Request, res: Response) {
    const file = req.file;
    const id = req.params;
    const currentTime = now();

    await AppDataSource.manager.update(Profile, { id }, { profile_picture: file.path, updated_at: currentTime });

    const profile = await AppDataSource.getRepository(Profile)
        .createQueryBuilder("profiles")
        .select([
            "profiles.id", "profiles.user_id", "profiles.firstname",
            "profiles.lastname", "profiles.gender", "profiles.phone",
            "profiles.whatsapp", "profiles.profile_picture"
        ])
        .where("profiles.id = :id", { id })
        .getOne()

    const responseData = {
        id: profile.id,
        user_id: profile.user_id,
        firstname: profile.firstname,
        lastname: profile.lastname,
        gender: profile.gender,
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        profile_picture: profile.profile_picture ? `${req.protocol}://${req.get("host")}${profile.profile_picture}` : profile.profile_picture,
    };

    return res.status(200).json({
        message: "Profile picture updated successfully.",
        data: responseData
    });
}
