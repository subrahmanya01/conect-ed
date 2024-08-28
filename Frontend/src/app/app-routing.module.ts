import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './main/overview/overview.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileOverviewComponent } from './profile/profile-overview/profile-overview.component';
import { AnswersComponent } from './main/answers/answers.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { AuthGuard } from './guards/auth.guard';
import { DActivateLoginGuard } from './guards/d-activate-login.guard';

const routes: Routes = [
  {
    path:'',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"login",
    component:LoginComponent,
    canActivate: [DActivateLoginGuard]
  },
  {
    path:"register",
    component:RegisterComponent,
    canActivate: [DActivateLoginGuard]
  },
  {
    path:"answer/:id",
    component:AnswersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"profile/:id",
    component:ProfileOverviewComponent,
    canActivate: [AuthGuard]

  },
  {
    path:"chat",
    component:ChatWindowComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"chat/:id",
    component:ChatWindowComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"about-us",
    component:AboutUsComponent,
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
