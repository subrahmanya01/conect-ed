export interface AddChatModel {
    from: string,
    to: string,
    message: string
}
export interface ChatModel
{
    from:      string;
    to:        string;
    message:   string;
    isRead:    boolean;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface NotificationModel
{
    _id: string;
    userId: string;
    message: string;
    isRead: boolean;
    link: string;
}