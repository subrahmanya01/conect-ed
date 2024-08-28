import { Injectable } from '@angular/core';
import { LoginModel, UserModel } from '../interfaces/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly JWT_TOKEN:string = 'JWT_TOKEN';
  public readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public readonly LOGGED_IN_USER = "LOGED_IN_USER";

  constructor(private userService: UserService, private router:Router) {}

  login(data : LoginModel)
  {
    this.userService.login(data).subscribe({
      next:(data)=>{
        this.setAccessToken(data["accessToken"]);
        this.setRefreshToken(data["refreshToken"]);
        this.setLoggedInUser(data["user"]); 
        this.router.navigateByUrl("/");
      },
      error:(err)=>{
        alert("Invalid email or password!!")
        console.error(err.message);
      }
    })
  }

  setAccessToken(accessToken: string)
  {
    console.log(accessToken);
    this.userService.accessToken = accessToken;
    localStorage[this.JWT_TOKEN] = accessToken;
  }

  setRefreshToken(refreshToken : string)
  {
    console.log(refreshToken);
    this.userService.refreshToken = refreshToken;
    localStorage[this.REFRESH_TOKEN] = refreshToken;
  }

  setLoggedInUser(user: UserModel)
  {
    this.userService.loggedInUser = user; 
    localStorage[this.LOGGED_IN_USER] = JSON.stringify(user);
    this.userService.accessToken
  }

  setAccessTokenAndRefreshToken(data : any)
  {
    localStorage.setItem(this.JWT_TOKEN, data["accessToken"]);
    localStorage.setItem(this.REFRESH_TOKEN, data["refreshToken"])
  }

  logout()
  {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
