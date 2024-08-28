import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../interfaces/api-response-model';
import { settings } from 'src/assets/appsettings';
import { AddQuestionModel, EditQuestionModel } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseurl: string  = settings.BACKEND_BASE_URL;
  pageSize : number = settings.QUESTION_PAGE_SIZE;

  constructor(private httpClient : HttpClient) {
   }

  public getQuestions() : Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseurl + "/question/");
  }

  public getQuestionByUserId(userId: string) : Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseurl +`/question/${userId}`);
  }

  public getQuestionByQuestionId(questionId: string) : Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseurl +`//question/get/${questionId}`);
  }

  public getQuestionsForPage(pageNumber : number) : Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseurl + `/question/page/${pageNumber}/${this.pageSize}`);
  }

  public AddQuestion(question : AddQuestionModel) : Observable<any>
  {
    return this.httpClient.post(this.baseurl +"/question/add", question);
  }

  public deleteQuestion(questionId : string): Observable<any>
  {
    return this.httpClient.delete(this.baseurl + `/question/delete/${questionId}`);
  }

  public editQuestion(editedQuestion: EditQuestionModel ):Observable<any>
  {
    return this.httpClient.patch(this.baseurl + `/question/edit`, editedQuestion);
  }

  public searchQuestions(keyword : string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseurl + `/search/${keyword}`);
  }

  public searchQuestionsWithPageOutput(keyword : string, page: number, pageSize: number):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseurl + `/search/${keyword}`);
  }
}
