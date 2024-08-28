import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { RouterModule } from '@angular/router';
import { FollowingFollowerModalComponent } from './following-follower-modal/following-follower-modal.component';



@NgModule({
  declarations: [
    ProfileOverviewComponent,
    FollowingFollowerModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:
  [
    ProfileOverviewComponent
  ]
})
export class ProfileModule { }
