"use client";
import { useUserStore } from "@/stores/userStore";
import { logout } from "@/lib/auth";

export default function Page() {
    const user = useUserStore((state) => state.user);
    console.log("user", user);
    return (
        <div>
            <h1>Page</h1>
            <p>{user?.name}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}