import { UUID } from "crypto";

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}

interface User {
    id: UUID;
    username: string;
    email: string;
    email_verified_at: string;
    is_superuser: boolean
    created_at: string;
    updated_at: string;
}

export interface GetUserResponse {
    message: string;
    data: User
}

export interface RelatedUser {
    id: UUID;
    username: string;
    email: string;
    email_verified_at: string;
    is_superuser: boolean
}

export interface CreateProfileData {
    firstname: string;
    lastname: string;
    gender?: Gender;
    phone?: string;
    whatsapp?: string;
}

export interface SendProfilePictureData {
    profile_picture: string;
}