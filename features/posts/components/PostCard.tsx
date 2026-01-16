"use client";

import { Post } from "@/types/types";
import Link from "next/link";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    // Truncate body text if too long
    const truncatedBody = post.body.length > 150 
        ? `${post.body.substring(0, 150)}...` 
        : post.body;

    return (
        <Link 
            href={`/posts/${post.id}`}
            className="group relative flex flex-col h-full rounded-xl bg-white p-8 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] hover:-translate-y-1 cursor-pointer dark:bg-slate-800 dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)] overflow-hidden"
        >
            {/* Gradient Background - từ đậm ở trên xuống nhạt ở dưới */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 -z-10" />
            
            {/* Content - flex container để flex-grow hoạt động */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Header - làm mờ hơn */}
                <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-normal text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                        User {post.userId}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                        #{post.id}
                    </span>
                </div>

                {/* Title - giảm weight và size */}
                <h2 className="mb-4 text-lg font-medium text-slate-900 leading-snug transition-colors duration-300 group-hover:text-[#3B82F6] dark:text-white dark:group-hover:text-blue-400">
                    {post.title}
                </h2>

                {/* Body - tăng line-height */}
                <p className="flex-grow line-clamp-3 text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                    {truncatedBody}
                </p>

                {/* Footer - modernize button */}
                <div className="mt-auto flex items-center text-sm font-normal text-slate-500 group-hover:text-[#3B82F6] transition-colors duration-300">
                    <span className="mr-2">Read article</span>
                    <svg 
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" 
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
}