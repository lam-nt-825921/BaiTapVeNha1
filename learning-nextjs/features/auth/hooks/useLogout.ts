"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { logout } from "@/lib/auth";

/**
 * Custom hook để xử lý logout
 * Dùng được ở bất kỳ Client Component nào
 */
export function useLogout() {
    const router = useRouter();
    const clearUser = useUserStore((state) => state.clearUser);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true);
        try {
            await logout();        // Xóa cookie ở server
            clearUser();           // Xóa user ở client store
            router.push("/login"); // Redirect
        } catch (error) {
            console.error("Logout failed:", error);
            // Có thể throw error để component handle
        } finally {
            setIsLoggingOut(false);
        }
    }, [clearUser, router]);

    return {
        handleLogout,
        isLoggingOut,
    };
}

