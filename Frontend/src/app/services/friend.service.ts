import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from 'src/assets/appsettings';
import { ApiResponseModel } from '../interfaces/api-response-model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {


  baseUrl : string = settings.BACKEND_BASE_URL;
  constructor(private httpClient: HttpClient, private userService: UserService) { }

  public followUser(userId: string):Observable<ApiResponseModel>
  {
    return this.httpClient.post<ApiResponseModel>(this.baseUrl + '/friend/follow', { followedBy : this.userService.getUserId(),
       followingTo: userId});
  }
  public unFollowUser(userId: string):Observable<ApiResponseModel>
  {
    return this.httpClient.post<ApiResponseModel>(this.baseUrl + '/friend/un-follow', { followedBy : this.userService.getUserId(),
       followingTo: userId});
  }

  public getFollowingList(userId: string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + '/friend/following/' + userId);
  }

  public getFollowerList(userId: string):Observable<ApiResponseModel>
  {
    return this.httpClient.get<ApiResponseModel>(this.baseUrl + '/friend/followers/'+ userId);
  }
}
