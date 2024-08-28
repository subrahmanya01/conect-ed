export interface ApiResponseModel   {
    resultMessage: ResultMessage;
    resultCode: string;
    [key : string] : any;
}

export interface ResultMessage {
    en: string;
}