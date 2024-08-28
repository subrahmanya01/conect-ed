import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';

@NgModule({
  declarations: [
    ChatWindowComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ChatWindowComponent,
  ]
})
export class ChatModule { }
