"use client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/features/auth/actions/authActions";
import { useUserStore } from "@/stores/userStore";

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
        <div>
            <h1>Login</h1>
            <div>
                <form action={formAction}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Username" 
                        id="username" 
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        id="password" 
                    />
                    {state.error && <p style={{ color: "red" }}>{state.error}</p>}
                    <button type="submit" disabled={isPending}>
                        {isPending ? "Đang đăng nhập..." : "Login"}
                    </button>
                </form>
                <Link href="/register">Registration</Link>
            </div>
        </div>
    );
}