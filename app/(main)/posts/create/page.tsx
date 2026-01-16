"use client";
import { createPostAction } from "@/features/posts/actions/postActions";
import { useActionState, useState } from "react";
import { Button, Input } from "@/components/ui";
import Link from "next/link";

export default function CreatePostPage() {
    const [state, formAction, isPending] = useActionState(createPostAction, {
        error: null,
        success: false,
        post: null,
    });

    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    // If success, show success screen
    if (state.success && state.post) {
        
        return (
            <div className="mx-auto max-w-3xl">
                <div className="rounded-xl bg-white p-8 shadow-xl dark:bg-gray-900 sm:p-10">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                            <svg
                                className="h-8 w-8 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Post Created Successfully!
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Your post has been published and is now live.
                        </p>
                    </div>

                    {/* Post Preview */}
                    <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
                        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            {state.post.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                            {state.post.body}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href={`/posts/${state.post.id}`}
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-full sm:w-auto"
                        >
                            View Post
                        </Link>
                        <Link
                            href="/posts"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-transparent px-6 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 w-full sm:w-auto"
                        >
                            Back to Posts
                        </Link>
                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => {
                                window.location.href = "/posts/create";
                            }}
                            className="w-full sm:w-auto"
                        >
                            Create Another
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Normal form view
    return (
        <div className="mx-auto max-w-3xl">
            <div className="rounded-xl bg-white p-8 shadow-xl dark:bg-gray-900 sm:p-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Create New Post
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Share your thoughts and ideas with the community
                    </p>
                </div>

                {/* Error Message */}
                {state.error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        <div className="flex items-start gap-2">
                            <svg
                                className="mt-0.5 h-5 w-5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{state.error}</span>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form action={formAction} className="space-y-6">
                    <div>
                        <Input
                            name="title"
                            label="Title"
                            placeholder="Enter post title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            required
                            disabled={isPending}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="body"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Content
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            rows={8}
                            placeholder="Write your post content here..."
                            value={formData.body}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    body: e.target.value,
                                }))
                            }
                            required
                            disabled={isPending}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:disabled:bg-gray-800/50"
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                        <Link
                            href="/posts"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-transparent px-6 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 w-full sm:w-auto"
                        >
                            Cancel
                        </Link>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isPending}
                            disabled={isPending}
                            className="w-full sm:w-auto"
                        >
                            {isPending ? "Publishing..." : "Publish Post"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}