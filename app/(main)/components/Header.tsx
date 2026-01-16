"use client";

import Link from "next/link";
import { useUserStore, useIsHydrated } from "@/stores/userStore";
import { useLogout } from "@/features/auth/hooks/useLogout";
import UserMenu from "@/components/ui/UserMenu";

export default function Header() {
    const user = useUserStore((state) => state.user);
    const isHydrated = useIsHydrated();
    const { handleLogout, isLoggingOut } = useLogout();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-5 lg:px-6 xl:px-8 2xl:px-12">
                <Link 
                    href="/" 
                    className="flex items-center space-x-2 transition-opacity hover:opacity-80 cursor-pointer"
                >
                    <h1 className="text-xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                        MyApp
                    </h1>
                </Link>

                <div className="flex items-center space-x-4">
                    {!isHydrated ? (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse dark:bg-slate-700" />
                            <span className="text-sm text-slate-500 dark:text-slate-400">Loading...</span>
                        </div>
                    ) : user ? (
                        <UserMenu
                            userName={user.name}
                            userEmail={user.email}
                            onLogoutClick={handleLogout}
                            isLoggingOut={isLoggingOut}
                        />
                    ) : (
                        <>
                            <Link 
                                href="/login"
                                className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563EB] shadow-sm hover:shadow-md"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

