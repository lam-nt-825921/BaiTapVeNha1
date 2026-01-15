import { User } from "@/types/types";

export type LoginData = {
    username: string;
    password: string;
};

export type RegistrationData = {
    username: string;
    password: string;
    email: string;
};



export type LoginResponse = {
    user: User;
    token: string;
};