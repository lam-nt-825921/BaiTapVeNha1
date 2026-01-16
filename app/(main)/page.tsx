"use client";

import Link from "next/link";
import { useUserStore, useIsHydrated } from "@/stores/userStore";
import { FeatureCard } from "./components";

export default function Page() {
    const user = useUserStore((state) => state.user);
    const isHydrated = useIsHydrated();

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
            {/* Hero Section */}
            <section className="mx-auto w-full max-w-[1600px] px-4 py-20 sm:px-5 lg:px-6 xl:px-8 2xl:px-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                        Welcome to{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            MyApp
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                        A modern platform for sharing and discovering great content. 
                        Create, share, and explore posts from our community.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/posts"
                            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Explore Posts
                        </Link>
                        {isHydrated && !user && (
                            <Link
                                href="/register"
                                className="text-base font-semibold leading-6 text-gray-900 transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            >
                                Get Started <span aria-hidden="true">→</span>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-5 lg:px-6 xl:px-8 2xl:px-12">
                <div className="flex flex-wrap justify-center gap-8">
                    <FeatureCard
                        svg={
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v4.5H6v-4.5z" />
                            </svg>
                        }
                        title="Create Posts"
                        description="Share your thoughts and ideas with our community. Create engaging posts easily."
                        link="/posts/create"
                        iconBgColor="bg-blue-100 dark:bg-blue-900/30"
                        iconTextColor="text-blue-600 dark:text-blue-400"
                    />

                    <FeatureCard
                        svg={
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        }
                        title="Discover Content"
                        description="Explore posts from the community. Find interesting content tailored to your interests."
                        link="/posts"
                        iconBgColor="bg-purple-100 dark:bg-purple-900/30"
                        iconTextColor="text-purple-600 dark:text-purple-400"
                    />

                    <FeatureCard
                        svg={
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75v5.25a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-5.25m-15-9a2.25 2.25 0 012.25-2.25h11.25a2.25 2.25 0 012.25 2.25m-15 0v9a2.25 2.25 0 002.25 2.25h11.25a2.25 2.25 0 002.25-2.25V6.75m-15 0h15" />
                            </svg>
                        }
                        title="View Albums"
                        description="Browse through your photo collections and memories."
                        link="/albums"
                        iconBgColor="bg-green-100 dark:bg-green-900/30"
                        iconTextColor="text-green-600 dark:text-green-400"
                    />
                </div>
            </section>

            
        </div>
    );
}