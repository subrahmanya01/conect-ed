import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddChatModel, ChatModel } from 'src/app/interfaces/chat';
import { UserModel } from 'src/app/interfaces/user';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked{
  chatUsers: UserModel[] = [];
  currentlySelectedUser: UserModel|null = null;
  chatsForCurrentlySelectedUser : ChatModel[] =[] ;
  userId : string ="";
  @ViewChild("chatMessage") private chatinputBox:any;

  constructor(private chatService: ChatService, private userService:UserService, private socketService: SocketService, private route: ActivatedRoute, private router:Router) {}
 
  ngAfterViewChecked(): void {
    let element:any = document.getElementById("scrollContainer");
    element.scrollTop = element?.scrollHeight;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param=>{
      let id = param.get("id");
      this.userService.getUserByUserId(id??"").subscribe({
        next:(data:any)=>{
          //alert(JSON.stringify(data))
          this.currentlySelectedUser = data["user"];
          this.chatUsers.unshift(data["user"]);
          this.getChatForUser(this.userService.getUserId(), id??'');
        },
        error:(err)=>{
          console.error(err.message);
        }
      })
    })

    this.userId = this.userService.getUserId();
    this.chatService.getChatUsers(this.userService.getUserId()).subscribe({
      next: (data)=>{
        let isExist: boolean = false;
        for(let i=0;i<data["users"].length; i++)
          {
            if(data["users"][i]._id==this.chatUsers[0]?._id)
              {
                isExist = true;
                break;
              }
          }
          if(isExist)
            {
              this.chatUsers = data["users"];
            }
            else
            {
               this.chatUsers =[...this.chatUsers, ...data["users"]]
            }
      },
      error: (err)=>{
        console.error(err);
      }
    })
    console.log(`${JSON.parse(localStorage["LOGED_IN_USER"])._id}_chat`)

    this.socketService.listen(`${JSON.parse(localStorage["LOGED_IN_USER"])._id}_chat`).subscribe((data:any)=>{
      this.chatsForCurrentlySelectedUser.push(JSON.parse(data))
      console.log(data);
    })
  }

  onChatUserSelect(user: UserModel)
  {
    this.currentlySelectedUser = user;
    this.getChatForUser(this.userService.getUserId(), user._id);
  }

  addChat(message: string)
  {
    if(message.trim().length==0) return;
    let newChat = {
      from: this.userService.getUserId(),
      to: this.currentlySelectedUser?._id,
      message: message
    } as AddChatModel;

    this.chatService.addChat(newChat).subscribe({
      next: (data)=>{
        this.chatsForCurrentlySelectedUser.push(data["chat"])
        this.chatinputBox.nativeElement.value="";
        this.socketService.emit('chat', JSON.stringify(data["chat"]));
      },
      error: (err)=>{
        console.error("Failed to add chat");
      }
    })
  }

  getChatForUser(from: string, to: string)
  {
    this.chatService.getUserChats(this.userService.getUserId(), this.currentlySelectedUser?._id??'').subscribe({
      next: (data)=>{
        this.chatsForCurrentlySelectedUser = data["chats"];
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

}
