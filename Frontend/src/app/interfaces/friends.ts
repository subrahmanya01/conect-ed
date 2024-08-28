import { UserModel } from "./user";

export interface Followers {
    _id:        string;
    followedBy: UserModel;
    followingTo: string;
}

export interface Following {
    _id:        string;
    followingTo: UserModel;
    followedBy: string;
}