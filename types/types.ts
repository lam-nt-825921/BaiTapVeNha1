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

export type Post = {
    id: number;
    userId: string;
    title: string;
    body: string;
};

export type Comment = {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
};