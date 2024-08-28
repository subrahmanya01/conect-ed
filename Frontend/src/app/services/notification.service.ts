import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from 'src/assets/appsettings';
import { ApiResponseModel } from '../interfaces/api-response-model';
import { AddNotificationModel } from '../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseurl: string  = settings.BACKEND_BASE_URL;

  constructor(private httpClient : HttpClient) {
   }

   public getNotifications(userId : string):Observable<ApiResponseModel>
   {
      return this.httpClient.get<ApiResponseModel>(this.baseurl + `/notification/${userId}`);
   }

   public addNotification(data : AddNotificationModel):Observable<ApiResponseModel>
   {
      return this.httpClient.post<ApiResponseModel>(this.baseurl + `/notification/add`, data);
   }

   public makeNotificationRead(notificationId: string):Observable<ApiResponseModel>
   {
      return this.httpClient.patch<ApiResponseModel>(this.baseurl + `/notification/${notificationId}`, {});
   }

   public getNotifiableUserWhenQuestionAdded(userId: string, questionId: string):Observable<any>
   {
      let url1= this.baseurl + `/notification/question-added/${userId}/${questionId}`;
      return this.httpClient.get<any>(url1);
   }

   public getNotifiableUserWhenAnswerAdded(userId: string, answerId: string):Observable<any>
   {
      let url = this.baseurl + `/notification/answer-added/${userId}/${answerId}`;
      return this.httpClient.get<any>(url);
   }

}
