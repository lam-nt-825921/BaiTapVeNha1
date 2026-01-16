"use client";

import { use, useState, useCallback, useEffect, Profiler } from "react";
import Link from "next/link";
import { getPost } from "@/features/posts/services/postServices";
import { Post } from "@/types/types";
import { Button } from "@/components/ui";
import CommentContainer from "@/features/comments/components/CommentContainer";

export interface PostDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
    const { id } = use(params);
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPost = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const postData = await getPost(id);
            setPost(postData);
        } catch (err) {
            console.error("Error fetching post:", err);
            setError("Failed to load post. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    // Gọi fetchPost khi component mount hoặc id thay đổi
    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    // Loading state
    if (loading) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-5 lg:px-6 xl:px-8">
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <svg 
                            className="mx-auto h-12 w-12 animate-spin text-blue-600" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                            />
                            <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading post...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !post) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-5 lg:px-6 xl:px-8">
                <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
                    <svg 
                        className="mx-auto h-12 w-12 text-red-600 dark:text-red-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
                        />
                    </svg>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        {error || "Post not found"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        The post you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Button variant="primary" onClick={fetchPost}>
                            Try Again
                        </Button>
                        <Link href="/posts">
                            <Button variant="outline">
                                Back to Posts
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Success state - Post content (wrapped with React Profiler)
    return (
        <Profiler
            id="PostDetailPage"
            onRender={(
                id,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime
            ) => {
                console.log("[Profiler]", {
                    id,
                    phase,
                    actualDuration,
                    baseDuration,
                    startTime,
                    commitTime,
                });
            }}
        >
            <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-5 lg:px-6 xl:px-8">
                {/* Back Button */}
                <Link 
                    href="/posts"
                    className="mb-6 inline-flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <svg 
                        className="mr-2 h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
                        />
                    </svg>
                    Back to Posts
                </Link>

                {/* Post Card */}
                <article className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                User {post.userId}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Post #{post.id}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-8">
                        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                            {post.title}
                        </h1>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                {post.body}
                            </p>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                            <Link href="/posts">
                                <Button variant="outline" size="sm">
                                    View All Posts
                                </Button>
                            </Link>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                    <svg 
                                        className="mr-2 h-4 w-4" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="1.5" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                                        />
                                    </svg>
                                    Like
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <svg 
                                        className="mr-2 h-4 w-4" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="1.5" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z" 
                                        />
                                    </svg>
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </article>
                <CommentContainer postId={id} />
            </div>
        </Profiler>
    );
}