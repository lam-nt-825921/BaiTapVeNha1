"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface FeatureCardProps {
    svg: ReactNode;
    title: string;
    description: string;
    link: string;
    iconBgColor?: string;
    iconTextColor?: string;
}

export default function FeatureCard({
    svg,
    title,
    description,
    link,
    iconBgColor = "bg-blue-100 dark:bg-blue-900/30",
    iconTextColor = "text-blue-600 dark:text-blue-400",
}: FeatureCardProps) {
    return (
        <Link
            href={link}
            className="group relative block w-full max-w-sm rounded-xl bg-white p-8 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1 cursor-pointer dark:bg-slate-800 dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] overflow-hidden"
        >
            {/* Gradient Background - subtle */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50 opacity-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 -z-10" />
            
            {/* Content */}
            <div className="relative z-10">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColor} transition-transform duration-300 group-hover:scale-110`}>
                    <div className={iconTextColor}>
                        {svg}
                    </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#3B82F6] dark:text-white dark:group-hover:text-blue-400">
                    {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {description}
                </p>
            </div>
        </Link>
    );
}
