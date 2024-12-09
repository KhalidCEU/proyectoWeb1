// types/Comment.ts

export interface Comment {
    user: {
        _id: string;
        username: string;
    }
    comment: string;
    date: Date;
}