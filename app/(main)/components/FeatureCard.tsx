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
            className="block rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900"
        >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgColor}`}>
                <div className={iconTextColor}>
                    {svg}
                </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </Link>
    );
}
