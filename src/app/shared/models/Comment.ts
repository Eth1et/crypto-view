import { User } from "./User";

export interface Comment{
    forumId: number;
    sender: User;
    date: firebase.default.firestore.Timestamp;
    message: string;
}