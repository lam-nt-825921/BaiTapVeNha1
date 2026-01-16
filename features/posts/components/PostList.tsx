"use client";

import PostCard from "./PostCard";
import { Post } from "@/types/types";

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    if (posts.length === 0) {
        return (
            <div className="rounded-xl bg-white p-12 text-center shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:bg-slate-800 dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                <svg
                    className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-[#1E293B] dark:text-white">
                    No posts found
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Try adjusting your search or filters
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}