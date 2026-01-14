"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function isAuthenticated() {
    const token = (await cookies()).get("token");
    return !!token;
}

export async function logout() {
    (await cookies()).delete("token");
    redirect("/login");
}