"use client";

import { PostListQueryParams, PostListOptions } from "../types/type";
import { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui";
import Tooltip from "@/components/ui/Tooltip";

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
        <div className="rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:bg-slate-800 dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
            {/* Search và Filters cùng hàng - align items-center để căn chỉnh */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                {/* Search Input - chiếm không gian còn lại */}
                <div className="flex-1 w-full">
                    <Input
                        type="text"
                        placeholder="Search by title or content..."
                        value={query}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Filters - cùng hàng với icon buttons */}
                <div className="flex gap-3 items-center">
                    {/* Sort - Icon button với tooltip */}
                    <Tooltip content="Sort posts by date">
                        <div className="relative">
                            <select
                                value={sort}
                                onChange={(e) => handleSort(e.target.value as "asc" | "desc")}
                                className="h-11 rounded-lg border border-slate-200 bg-white pl-10 pr-8 py-2 text-sm text-slate-700 cursor-pointer
                                           focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-0
                                           transition-all duration-200 appearance-none
                                           dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-blue-400 dark:focus:ring-blue-400
                                           hover:border-slate-300 dark:hover:border-slate-600"
                            >
                                <option value="desc">Newest</option>
                                <option value="asc">Oldest</option>
                            </select>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg 
                                    className="w-5 h-5 text-slate-500 dark:text-slate-400" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="1.5" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12.75" 
                                    />
                                </svg>
                            </div>
                        </div>
                    </Tooltip>

                    {/* Limit - Icon button với tooltip */}
                    <Tooltip content="Number of posts to display">
                        <div className="relative">
                            <select
                                value={limit}
                                onChange={(e) => handleLimit(Number(e.target.value))}
                                className="h-11 rounded-lg border border-slate-200 bg-white pl-10 pr-8 py-2 text-sm text-slate-700 cursor-pointer
                                           focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-0
                                           transition-all duration-200 appearance-none
                                           dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-blue-400 dark:focus:ring-blue-400
                                           hover:border-slate-300 dark:hover:border-slate-600"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg 
                                    className="w-5 h-5 text-slate-500 dark:text-slate-400" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="1.5" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
                                    />
                                </svg>
                            </div>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}