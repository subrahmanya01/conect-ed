import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModel } from 'src/app/interfaces/chat';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  notifications: NotificationModel[] = [];
  unreadMessageCount: number = 0;
  constructor(private socketService: SocketService, private userService: UserService, private notificationService: NotificationService, private router: Router){}

  ngOnInit(): void {
    this.notificationService.getNotifications(this.userService.getUserId()).subscribe({
      next: (data)=>{
        this.notifications = data["notificatuions"].reverse();
        this.notifications.forEach(notification=>{
          if(!notification.isRead) this.unreadMessageCount++;
        })
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
    
    this.socketService.listen(`${JSON.parse(localStorage["LOGED_IN_USER"])._id}_notification`).subscribe((data:any)=>{
      this.notifications.unshift(data)
      if(data.isRead==false) this.unreadMessageCount++;
    })

  }

  makeNotificationRead(notification: NotificationModel)
  {
    this.notificationService.makeNotificationRead(notification._id).subscribe({
      next:(data)=>{
        for(let i=0;i< this.notifications.length; i++)
          {
            if(this.notifications[i]._id==notification._id)
              {
                this.notifications[i].isRead = true;
                if(this.unreadMessageCount>0)
                this.unreadMessageCount--;
              }
          }
        this.router.navigateByUrl(notification.link);
      },
      error: (err)=>{
        console.log(err.message);
      }
    })
  }

  
}
