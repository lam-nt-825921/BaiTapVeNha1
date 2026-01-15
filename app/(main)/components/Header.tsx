"use client";

import Link from "next/link";
import { useUserStore, useIsHydrated } from "@/stores/userStore";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function Header() {
    const user = useUserStore((state) => state.user);
    const isHydrated = useIsHydrated();
    const { handleLogout, isLoggingOut } = useLogout();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link 
                    href="/" 
                    className="flex items-center space-x-2 transition-opacity hover:opacity-80"
                >
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        MyApp
                    </h1>
                </Link>

                <nav className="hidden items-center space-x-6 md:flex">
                    <Link 
                        href="/posts" 
                        className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                        Posts
                    </Link>
                    <Link 
                        href="/" 
                        className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                        Home
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    {!isHydrated ? (
                        <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
                    ) : user ? (
                        <>
                            <Link 
                                href="/profile"
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                {user?.name}
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                disabled={isLoggingOut}
                                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                {isLoggingOut ? "Logging out..." : "Logout"}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                href="/login"
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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

