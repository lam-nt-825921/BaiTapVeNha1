"use client";

import { useUserStore } from "@/stores/userStore";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function ProfilePage() {
    const user = useUserStore((state) => state.user);
    const { handleLogout, isLoggingOut } = useLogout();
    
    return (
        <div className="profile-container">
            <div>
                <h1>Profile</h1>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                <p>{user?.address.street}</p>
                <p>{user?.address.suite}</p>
                <p>{user?.address.city}</p>
                <p>{user?.address.zipcode}</p>
                <p>{user?.address.geo.lat}</p>
                <p>{user?.address.geo.lng}</p>
                <p>{user?.phone}</p>
                <p>{user?.website}</p>
                <p>{user?.company.name}</p>
                <p>{user?.company.catchPhrase}</p>
                <p>{user?.company.bs}</p>
            </div>
            <div>
                <button>Edit</button>
                <button onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
            </div>
        </div>
    );
}
