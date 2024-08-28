export interface UserModel {
    _id:         string;
    email:       string;
    firstName:   string;
    lastName:    string;
    type:        string;
    tags:        string[];
    language:    string;
    isPremium:   boolean;
    countryCode: string;
    photoUrl:    string;
    isActivated: boolean;
    isVerified:  boolean;
    lastLogin:   string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}


export interface RegisterModel {
    email : string;
    firstName: string;
    lastName: string;
    password:string;
    tags: string[];
}


export interface LoginModel {
    email: string;
    password: string;
}


