import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'linked-in-reva-frontend';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private socketService: SocketService){}

  ngDoCheck(): void {
    if(localStorage[this.authService.JWT_TOKEN]) this.isLoggedIn =true;
    else this.isLoggedIn = false;
  }



}
