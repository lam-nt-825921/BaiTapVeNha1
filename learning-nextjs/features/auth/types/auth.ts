export type LoginData = {
    username: string;
    password: string;
};

export type RegistrationData = {
    username: string;
    password: string;
    email: string;
};

export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

export type LoginResponse = {
    user: User;
    token: string;
};