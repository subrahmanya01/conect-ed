export interface AddAnswerModel {
    questionId: string;
    content:    string;
    createdBy:  string;
    tags: string[];
}

export interface EditAnswerModel {
    _id: string;
    content:    string;
    tags?:string[]
}

export interface AnswerModel {
    _id:        string;
    content:    string;
    questionId: string;
    createdBy:  CreatedBy;
    tags:       any[];
    isEdited:   boolean;
    isActive:   boolean;
    createdAt:  Date;
    updatedAt:  Date;
    __v:        number;
}

export interface CreatedBy {
    _id:       string;
    email:     string;
    firstName: string;
    lastName:  string;
}