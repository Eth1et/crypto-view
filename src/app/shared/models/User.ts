export interface User{
    id: string;
    username: string;
    email: string;
    name: {
        firstname: string;
        lastname: string;
    }
}