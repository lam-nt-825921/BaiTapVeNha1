"use client";

import { PostListQueryParams, PostListOptions } from "../types/type";
import { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui";

export interface PostSearchProps {
    setQueryParams: (queryParams: PostListQueryParams) => void;
    setOptions: (options: PostListOptions) => void;
}

export default function PostSearch({ setQueryParams, setOptions }: PostSearchProps) {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<"asc" | "desc">("desc");
    const [limit, setLimit] = useState(10);
    
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Search với debounce
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }

        searchTimerRef.current = setTimeout(() => {
            setQueryParams({ query: value || undefined });
        }, 300);
    }, [setQueryParams]);

    const handleSort = useCallback((value: "asc" | "desc") => {
        setSort(value);
        setOptions({ sort: value, limit });
    }, [limit, setOptions]);

    const handleLimit = useCallback((value: number) => {
        setLimit(value);
        setOptions({ sort, limit: value });
    }, [sort, setOptions]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Search Posts
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Find and filter posts from our community
                </p>
            </div>

            {/* Search Input */}
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Search by title or content..."
                    value={query}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Sort */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sort by
                    </label>
                    <select
                        value={sort}
                        onChange={(e) => handleSort(e.target.value as "asc" | "desc")}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900
                                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                                   dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>

                {/* Limit */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Show
                    </label>
                    <select
                        value={limit}
                        onChange={(e) => handleLimit(Number(e.target.value))}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900
                                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                                   dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    >
                        <option value={5}>5 posts</option>
                        <option value={10}>10 posts</option>
                        <option value={20}>20 posts</option>
                        <option value={50}>50 posts</option>
                    </select>
                </div>
            </div>
        </div>
    );
}