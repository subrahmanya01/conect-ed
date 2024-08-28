import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { settings } from 'src/assets/appsettings';
import { ApiResponseModel } from '../interfaces/api-response-model';
import { Observable } from 'rxjs';
import { AddChatModel } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl : string = settings.BACKEND_BASE_URL;
  
  constructor(private httpClient : HttpClient) { }

  public getChatUsers(userId : string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + `/chat/get-chat-users/${userId}`);
  }

  public getUserChats(from : string, to: string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + `/chat/get/${from}/${to}`);
  }

  public addChat(chat : AddChatModel):Observable<ApiResponseModel>
  {
    return this.httpClient.post<ApiResponseModel>(this.baseUrl + `/chat/add-chat`, chat);
  }
}
