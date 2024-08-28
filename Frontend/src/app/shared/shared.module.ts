import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { MainModule } from '../main/main.module';
import { NotificationComponent } from './notification/notification.component';
import { AppRoutingModule } from '../app-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmptyHeaderComponent } from './empty-header/empty-header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TagInputComponent,
    NotificationComponent,
    AboutUsComponent,
    EmptyHeaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    TagInputComponent,
    AboutUsComponent,
    EmptyHeaderComponent
  ]
})
export class SharedModule { }
