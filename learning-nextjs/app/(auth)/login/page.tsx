"use client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/features/auth/actions/authActions";
import { useUserStore } from "@/stores/userStore";
import { Button, Input } from "@/components/ui";

const initialState = { error: null, success: false, user: null };

export default function LoginPage() {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const [state, formAction, isPending] = useActionState(loginAction, initialState);

    useEffect(() => {
        if (state.success && state.user) {
            setUser(state.user);  
            router.push("/");     
        }
    }, [state, setUser, router]);

    return (
        <div className="rounded-xl bg-white p-8 shadow-xl dark:bg-gray-900 sm:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome Back
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Sign in to your account to continue
                </p>
            </div>

            {/* Form */}
            <form action={formAction} className="space-y-6">
                <Input
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    required
                    autoComplete="username"
                    disabled={isPending}
                />

                <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    disabled={isPending}
                />

                {state.error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        {state.error}
                    </div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isPending}
                    disabled={isPending}
                >
                    Sign In
                </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?{" "}
                </span>
                <Link
                    href="/register"
                    className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}