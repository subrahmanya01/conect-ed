export interface AddQuestionModel {
    title: string;
    content: string;
    createdBy: string;
    tags?:string[];
}

export interface QuestionModel {
    _id:       string;
    title:     string;
    content:   string;
    createdBy: CreatedBy;
    tags:      string[];
    isEdited:  boolean;
    isActive:  boolean;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface CreatedBy {
    _id:       string;
    email:     string;
    firstName: string;
    lastName:  string;
}

export interface EditQuestionModel {
    _id:     string;
    title:   string;
    content: string;
    tags:    string[];
}
