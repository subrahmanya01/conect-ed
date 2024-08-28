import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService, private authService : AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addTokenHeader(req, localStorage["JWT_TOKEN"])
    return next.handle(req).pipe(catchError(errorData =>{
      if(errorData.status===401)
        {
          this.handleRefreshToken(req, next);
        }
      return throwError(errorData)
    }));
  }

  handleRefreshToken(request : HttpRequest<any>, next:HttpHandler)
  {
      return this.userService.genarateRefreshToken(localStorage[this.authService.REFRESH_TOKEN]).subscribe({
        next: (data)=>{
          this.authService.setAccessTokenAndRefreshToken(data);
          return next.handle(this.addTokenHeader(request, localStorage[this.authService.JWT_TOKEN]))
        },
        error:(err)=>{
          console.log("hey error")
          this.authService.logout();
          return throwError(err);
        }
      })
  }

  addTokenHeader(request : HttpRequest<any>, token:any)
  {
    return request.clone({
      setHeaders:{
        Authorization: `Bearer ${localStorage['JWT_TOKEN']}`
      }
    })
  }
}
