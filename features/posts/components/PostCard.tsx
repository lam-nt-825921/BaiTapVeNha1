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
            className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
        >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    User {post.userId}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    Post #{post.id}
                </span>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {post.title}
            </h2>

            {/* Body */}
            <p className="line-clamp-3 text-gray-600 dark:text-gray-400">
                {truncatedBody}
            </p>

            {/* Footer */}
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg 
                    className="mr-1.5 h-4 w-4" 
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
                Read more
            </div>
        </Link>
    );
}