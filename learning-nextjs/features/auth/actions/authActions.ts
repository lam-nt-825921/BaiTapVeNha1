"use server";
import { mockLogin, mockRegistration } from "../services/authServices";
import { cookies } from "next/headers";
import { User } from "../types/auth";

type LoginState = {
    error: string | null;
    success: boolean;
    user: User | null;
};

type RegisterState = {
    error: string | null;
    success: boolean;
};

export async function loginAction(
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
        return { error: "Vui lòng nhập đầy đủ thông tin", success: false, user: null };
    }

    try {
        const response = await mockLogin({ username, password });
        
        // Set cookie ở server (middleware sẽ đọc được)
        (await cookies()).set("token", response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        // Return user để CLIENT lưu vào store
        return { error: null, success: true, user: response.user };
    } catch (error) {
        console.error(error);
        return { error: "Lỗi khi đăng nhập", success: false, user: null };
    }
}

export async function registerAction(
    prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    console.log("registerAction");
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;

    if (!username || !password || !email) {
        return { error: "Vui lòng nhập đầy đủ thông tin", success: false };
    }

    try {
        const response = await mockRegistration({ username, password, email });
        if (response.success) {
            console.log("Đăng ký thành công");
            return { error: null, success: true };
        } else {
            return { error: response.message, success: false };
        }
    } catch (error) {
        console.error(error);
        return { error: "Lỗi khi đăng ký", success: false };
    }
}