"use server";

import { updateProfile } from "../services/profileServices";
import type { User } from "@/types/types";
import {
    profileSchema,
    type ProfileFieldErrors,
    type ProfileFormValues,
} from "../schemas/profileSchemas";

export type ProfileActionState = {
    error: string | null;
    success: boolean;
    profile: User | null;
    fieldErrors: ProfileFieldErrors;
};

export const initialProfileState: ProfileActionState = {
    error: null,
    success: false,
    profile: null,
    fieldErrors: {},
};

export async function updateProfileAction(
    prevState: ProfileActionState,
    formData: FormData
): Promise<ProfileActionState> {
    const raw = {
        name: formData.get("name"),
        email: formData.get("email"),
        street: formData.get("street"),
        suite: formData.get("suite"),
        city: formData.get("city"),
        zipcode: formData.get("zipcode"),
        phone: formData.get("phone"),
        website: formData.get("website"),
        companyName: formData.get("companyName"),
    };

    const parsed = profileSchema.safeParse(raw);

    if (!parsed.success) {
        const fieldErrors: ProfileFieldErrors = {};

        for (const issue of parsed.error.issues) {
            const field = issue.path[0] as keyof ProfileFormValues;
            if (!fieldErrors[field]) {
                fieldErrors[field] = issue.message;
            }
        }

        return {
            ...prevState,
            error: "Please fix the highlighted fields.",
            success: false,
            fieldErrors,
        };
    }

    const currentUserJson = formData.get("currentUser");
    if (!currentUserJson || typeof currentUserJson !== "string") {
        return {
            ...prevState,
            error: "Missing current user data.",
            success: false,
            fieldErrors: {},
        };
    }

    try {
        const currentUser: User = JSON.parse(currentUserJson);
        const values = parsed.data;

        const payload: User = {
            ...currentUser,
            name: values.name,
            email: values.email,
            address: {
                ...currentUser.address,
                street: values.street ?? "",
                suite: values.suite ?? "",
                city: values.city ?? "",
                zipcode: values.zipcode ?? "",
            },
            phone: values.phone ?? "",
            website: values.website ?? "",
            company: {
                ...currentUser.company,
                name: values.companyName ?? "",
            },
        };

        const updated = await updateProfile(payload);

        return {
            error: null,
            success: true,
            profile: updated,
            fieldErrors: {},
        };
    } catch (error) {
        console.error(error);
        return {
            ...prevState,
            error: "Failed to update profile. Please try again.",
            success: false,
            fieldErrors: {},
        };
    }
}

