import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from 'src/assets/appsettings';
import { ApiResponseModel } from '../interfaces/api-response-model';
import { LoginModel, RegisterModel, UserModel } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId : string = "";
  userName : string ="";
  accessToken : string = "";
  refreshToken: string = "";
  loggedInUser: UserModel = {} as UserModel;
  email : string = "";

  baseUrl : string = settings.BACKEND_BASE_URL;
  constructor(private httpClient: HttpClient) { }

  public getUserId()
  {
    return this.userId;
  }

  public getUserName()
  {
    return this.userName;
  }

  public getUserEmail()
  {
    return this.email
  }
  
  public getUserByUserId(userId : string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + `/user/${userId}`)
  }

  public isEmailRegistered(email : string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + "/user/is-registered/"+email);
  }

  public register(data : RegisterModel):Observable<ApiResponseModel>
  {
    return this.httpClient.post<ApiResponseModel>(this.baseUrl + "/user", data);
  }

  public login(data: LoginModel):Observable<ApiResponseModel>
  {
    return this.httpClient.post<ApiResponseModel>(this.baseUrl + `/user/login`, data);
  }

  public genarateRefreshToken(token : string):Observable<any>
  {
     return this.httpClient.post(this.baseUrl+ "/user/refresh-token", {refreshToken : token});
  }


}
