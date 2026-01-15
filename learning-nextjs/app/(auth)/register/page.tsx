"use client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { registerAction } from "@/features/auth/actions/authActions";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";

export default function RegisterPage() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(registerAction, { error: null, success: false });
    
    useEffect(() => {
        if (state.success) {
            alert("Đăng ký thành công, vui lòng đăng nhập");
            router.push("/login");
        }
    }, [state, router]);

    return (
        <div className="rounded-xl bg-white p-8 shadow-xl dark:bg-gray-900 sm:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Create Account
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Sign up to get started with MyApp
                </p>
            </div>

            {/* Form */}
            <form action={formAction} className="space-y-6">
                <Input
                    name="username"
                    label="Username"
                    placeholder="Choose a username"
                    required
                    autoComplete="username"
                    disabled={isPending}
                />

                <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    disabled={isPending}
                />

                <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
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
                    Create Account
                </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                </span>
                <Link
                    href="/login"
                    className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Sign in
                </Link>
            </div>
        </div>
    );
}