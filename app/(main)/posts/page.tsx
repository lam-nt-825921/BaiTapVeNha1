"use client";

import { useState, useEffect, useCallback, Profiler } from "react";
import { PostList, PostSearch } from "@/features/posts/components";
import { getPosts } from "@/features/posts/services/postServices";
import { processPostList } from "@/features/posts/utils/postUtils";
import { PostListQueryParams, PostListOptions } from "@/features/posts/types/type";
import { Post } from "@/types/types";

export default function PostsPage() {
    // ========================================
    // STATE
    // ========================================
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<PostListOptions>({ limit: 10, sort: "desc" });

    // ========================================
    // FETCH DATA (async trong callback)
    // ========================================
    const fetchPosts = useCallback(async (params: PostListQueryParams) => {
        setLoading(true);
        try {
            const data = await getPosts(params);
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch khi component mount
    useEffect(() => {
        fetchPosts({});
    }, [fetchPosts]);

    // ========================================
    // HANDLERS
    // ========================================
    
    // Khi queryParams thay đổi → gọi API mới
    const handleSetQueryParams = useCallback((newParams: PostListQueryParams) => {
        fetchPosts(newParams);
    }, [fetchPosts]);

    // Khi options thay đổi → chỉ xử lý FE (không gọi API)
    const handleSetOptions = useCallback((newOptions: PostListOptions) => {
        setOptions(prev => ({ ...prev, ...newOptions }));
    }, []);

    // ========================================
    // PROCESS POSTS (FE processing)
    // ========================================
    const displayPosts = processPostList(posts, options);

    // ========================================
    // RENDER (wrapped with React Profiler)
    // ========================================
    return (
        <Profiler
            id="PostsPage"
            onRender={(
                id,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime
            ) => {
                // You can filter or format this log as you like
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
            <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-5 lg:px-6 xl:px-8 2xl:px-12 bg-slate-100 min-h-screen">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1E293B] dark:text-white">
                        All Posts
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Discover and explore posts from our community
                    </p>
                </div>

                {/* Search Section */}
                <div className="mb-8">
                    <PostSearch 
                        setQueryParams={handleSetQueryParams} 
                        setOptions={handleSetOptions} 
                    />
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <svg 
                                className="mx-auto h-12 w-12 animate-spin text-[#3B82F6]" 
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
                            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading posts...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        {displayPosts.length > 0 && (
                            <div className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                                Showing <span className="font-semibold text-[#1E293B] dark:text-white">{displayPosts.length}</span> post{displayPosts.length !== 1 ? 's' : ''}
                            </div>
                        )}

                        {/* Posts List */}
                        <PostList posts={displayPosts} />
                    </>
                )}
            </div>
        </Profiler>
    );
}