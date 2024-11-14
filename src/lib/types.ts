export interface User {
    id: string,
    email: string,
    name: string,
    picture: string
}

export interface Creator {
    name: string;
    image: string;
    tags: string[];
    followers: number;
    socials: {
        youtube: string;
        instagram: string;
    };
}