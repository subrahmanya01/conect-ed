import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-following-follower-modal',
  templateUrl: './following-follower-modal.component.html',
  styleUrls: ['./following-follower-modal.component.css']
})
export class FollowingFollowerModalComponent implements OnInit, OnChanges {
  @Input() userData : any;
  @Input() title : any;

  userInfo : UserModel[] = [];

  constructor(private userService: UserService, private friendService : FriendService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.userInfo = this.userData;
    console.log(this.userInfo)
  }

  ngOnInit(): void {
  }

  getFollowers()
  {

  }

  getFollowing()
  {

  }

}
