"use client";
import { useActionState, useEffect } from "react";
import { registerAction } from "@/features/auth/actions/authActions";
import { useRouter } from "next/navigation";

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
        <div>
            <h1>Register</h1>
            <div>
                <form action={formAction}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email" />
                    {state.error && <p style={{ color: "red" }}>{state.error}</p>}
                    <button type="submit" disabled={isPending}>
                        {isPending ? "Đang đăng ký..." : "Register"}
                    </button>
                </form>
                
            </div>
        </div>
    )
}