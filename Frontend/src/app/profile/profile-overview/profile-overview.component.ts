import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerModel } from 'src/app/interfaces/answers';
import { NotificationModel } from 'src/app/interfaces/chat';
import { Followers, Following } from 'src/app/interfaces/friends';
import { QuestionModel } from 'src/app/interfaces/question';
import { UserModel } from 'src/app/interfaces/user';
import { AnswerService } from 'src/app/services/answer.service';
import { FriendService } from 'src/app/services/friend.service';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {
  userProfile : UserModel = {} as UserModel;
  userId: string|null = "";
  followingList: Following[] = []
  followerList: Followers[] = []
  isFollowing: boolean = false;

  followingUsers: UserModel[] = [];
  followerUsers : UserModel[] = [];

  askedQuestions: QuestionModel[] =  [];
  addedAnswers: AnswerModel[] =   [];

  modalTitle: string ="Following";

  userListToSend : UserModel[] = [];

  constructor(public userService : UserService, private route: ActivatedRoute, private friendService:FriendService,
    private questionService: QuestionService, private answerService : AnswerService, private socketService: SocketService,
    private notificationService: NotificationService
  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.followingList = [];
      this.followerList = [];
      this.followerUsers = [];
      this.followingUsers = [];
      this.getUserProfile(this.userId??'');
      this.getFollowersList();
      this.getFollowingList();
      this.getAddedAnswers();
      this.getAskedQuestions();
    });
  }

  follow()
  {
    this.friendService.followUser(this.userId??'').subscribe({
      next:()=>{
        this.isFollowing = true;
        this.getFollowersList();
        this.addNotification();
      }
    });
  }

  onFolowingBtnClick()
  {
    this.modalTitle = "Following";
    this.userListToSend = this.followingUsers;
  }

  onFollowerBtnClick()
  {
    this.modalTitle = "Followers";
    this.userListToSend = this.followerUsers;
  }

  unfollow()
  {
    this.friendService.unFollowUser(this.userId??'').subscribe({
      next:()=>{
          window.location.reload();
      }
    });
  }

  getAskedQuestions()
  {
    this.questionService.getQuestionByUserId(this.userId??'').subscribe({
      next:(data)=>{
        this.askedQuestions = data["questions"];
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  }

  getAddedAnswers()
  {
    this.answerService.getAnswerByUserId(this.userId??'').subscribe({
     next: (data)=>{
      this.addedAnswers = data["answers"];
     },
     error:(err)=>{
      console.error(err.message);
     }

    })
  }

  getFollowersList()
  {
    this.friendService.getFollowerList(this.userId??'').subscribe({
      next: (data)=>{
        this.followerList = data["friends"];
        this.checkIsUserFollowedByCurrentLoggedInUser();
        this.getFollowerUsers();
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  }

  getFollowerUsers()
  {
    this.followerList.forEach(item =>{
      this.followerUsers.push(item.followedBy);
    })
  }

  getFollowingUsers()
  {
    this.followingList.forEach(item =>{
      this.followingUsers.push(item.followingTo);
    })
    console.log(this.followingUsers)
  }

  getFollowingList()
  {
    this.friendService.getFollowingList(this.userId??'').subscribe({
      next: (data)=>{
        this.followingList = data["friends"];
        this.getFollowingUsers();
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  }

  checkIsUserFollowedByCurrentLoggedInUser()
  {
    var user = this.userService.getUserId();
    this.followerList.forEach(follower => {
      if(follower.followedBy._id == user)
        {
          this.isFollowing = true;
        }
    });
  }

  getUserProfile(userId: string)
  {
    this.userService.getUserByUserId(userId).subscribe({
      next: (data)=>{
        this.userProfile = data["user"];
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  }

  addNotification()
  {
     let notificationModel : NotificationModel = {} as NotificationModel;
     notificationModel.userId = this.userId??'';
     notificationModel.message = `${this.userService.getUserName()} started following you.`
     notificationModel.link = `/profile/${this.userId}`;
     notificationModel.isRead = true;
     this.notificationService.addNotification(notificationModel).subscribe({
      next:(data)=>{
        this.socketService.emit("notification",data["notification"]);
      }
     })

  }

}
