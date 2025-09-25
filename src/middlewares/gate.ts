import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Profile } from "../entity/Profile";

export async function gateKeeper(req: Request, res: Response, next: NextFunction) {
    const authUserId = req.headers["x-user-id"];
    const isSuperuser = req.headers["x-is-superuser"];

    if (!authUserId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "PUT" || req.method === "DELETE") {
        const { id } = req.params

        const profile = await AppDataSource.getRepository(Profile)
            .createQueryBuilder("profiles")
            .select(["profiles.user_id"])
            .where("profiles.id = :id", { id })
            .getOne();

        if (authUserId != profile.user_id && !isSuperuser) {
            return res.status(403).json({ error: "Profile can only be updated or deleted by the owner." });
        }
    }

    next();
}