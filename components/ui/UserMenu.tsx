"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface UserMenuProps {
    userName: string;
    userEmail?: string;
    onProfileClick?: () => void;
    onLogoutClick: () => void;
    isLoggingOut?: boolean;
}

export default function UserMenu({ 
    userName, 
    userEmail, 
    onProfileClick, 
    onLogoutClick, 
    isLoggingOut 
}: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Get initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div ref={menuRef} className="relative">
            {/* Trigger Button - Avatar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white font-medium text-sm
                           hover:ring-2 hover:ring-[#3B82F6]/50 hover:ring-offset-2
                           transition-all duration-200 cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2"
                aria-label="User menu"
            >
                {getInitials(userName)}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-[0_8px_25px_rgba(0,0,0,0.12)] z-50 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {userName}
                        </p>
                        {userEmail && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                {userEmail}
                            </p>
                        )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        {/* Profile */}
                        <Link
                            href="/profile"
                            onClick={() => {
                                setIsOpen(false);
                                onProfileClick?.();
                            }}
                            className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            <svg 
                                className="w-5 h-5 mr-3 text-slate-500 dark:text-slate-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
                                />
                            </svg>
                            Profile
                        </Link>

                        {/* Logout */}
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onLogoutClick();
                            }}
                            disabled={isLoggingOut}
                            className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                            <svg 
                                className="w-5 h-5 mr-3" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" 
                                />
                            </svg>
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
