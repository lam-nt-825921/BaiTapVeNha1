"use server"

import { cookies } from "next/headers";


export async function isAuthenticated() {
    const token = (await cookies()).get("token");
    return !!token;
}

export async function logout() {
    (await cookies()).delete("token");
}