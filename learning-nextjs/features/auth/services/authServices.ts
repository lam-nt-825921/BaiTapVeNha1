"use server";
import { LoginData } from "../types/auth";
import { User } from "../types/auth";
import { LoginResponse } from "../types/auth";

export async function mockLogin(loginData: LoginData) {
    const user: User = {
        id: "1",
        name: "John Doe",
        username: loginData.username,
        email: "test@test.com",
        address: {
            street: "123 Main St",
            suite: "Apt 1",
            city: "Anytown",
            zipcode: "12345",
            geo: {
                lat: "37.774929",
                lng: "-122.419416",
            }
        },
        phone: "123-456-7890",
        website: "https://www.example.com",
        company: {
            name: "Example Inc",
            catchPhrase: "We do what we can",
            bs: "We build products"
        }
    };
    const loginResponse: LoginResponse = {
        user,
        token: "mock-token",
    };
    return loginResponse;
}
