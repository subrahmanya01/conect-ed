import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from 'src/assets/appsettings';
import { ApiResponseModel } from '../interfaces/api-response-model';
import { AddAnswerModel, EditAnswerModel } from '../interfaces/answers';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  baseUrl : string = settings.BACKEND_BASE_URL;
  constructor(private httpClient : HttpClient) { }

  public getAnswerByQuestionId(questionId : string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + `/answer/question/${questionId}`);
  }

  public getAnswerByUserId(userId : string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + `/answer/${userId}`);
  }

  public addAnswer(newAnswer : AddAnswerModel):Observable<ApiResponseModel>
  {
    return this.httpClient.post<ApiResponseModel>(this.baseUrl + `/answer/add`, newAnswer);
  }

  public editAnswer(editAnswer : EditAnswerModel):Observable<ApiResponseModel>
  {
    return this.httpClient.patch<ApiResponseModel>(this.baseUrl + `/answer/edit`, editAnswer);
  }

  public deleteAnswer(answerId : string):Observable<any>
  {
    return this.httpClient.delete(this.baseUrl + `/answer/delete/${answerId}`);
  }

}
