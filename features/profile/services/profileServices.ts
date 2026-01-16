import { api } from "@/lib/api";
import { User } from "@/types/types";


export async function updateProfile(profile: User) {
    const updatedProfile = await api.put<User>("/profile", profile);
    return updatedProfile;
}