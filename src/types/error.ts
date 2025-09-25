export interface CreateProfileFieldError {
    user_id?: string[];
    firstname?: string[];
    lastname?: string[];
    gender?: string[];
    phone?: string[];
    whatsapp?: string[];
    profile_picture?: string[];
}

export interface SendProfilePictureFieldError {
    profile_picture?: string[];
}