import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAnswerModel, AnswerModel, EditAnswerModel } from 'src/app/interfaces/answers';
import { NotificationModel } from 'src/app/interfaces/chat';
import { AnswerService } from 'src/app/services/answer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnChanges  {
  answerForm : FormGroup;
  tags : string [] = [];

  @ViewChild('tagInput') tagInputComponent : any;
  @Input() questionId : string|null = "";

  @Input() isEdit: boolean =  false;
  @Input() data: AnswerModel = {} as AnswerModel;
  @Output() onPopupClose : any = new EventEmitter();
  @Output() onAnswerAdded: any = new EventEmitter();

  constructor(private answerService : AnswerService, public formbuilder:FormBuilder, private router : Router,
     private userService : UserService, private notificationService: NotificationService, private socketService:SocketService)
  {
    this.answerForm = this.formbuilder.group({
      content : ['', Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isEdit)
      {
        this.answerForm = this.formbuilder.group({
          content : [this.data.content, Validators.required]
        })
        this.tagInputComponent.tagList = this.data.tags;
      }
      else
      {
        this.answerForm = this.formbuilder.group({
          content : ['', Validators.required]
        })
      }
  }

  public onClose()
  {
    this.tagInputComponent.tagList = [];
    this.onPopupClose.emit(true);
  }

  public submit()
  {
       if(!this.answerForm.valid) return;

       if(this.isEdit)
        {
          let editAnswer: EditAnswerModel  = {} as EditAnswerModel;
          editAnswer._id = this.data._id;
          editAnswer.content = this.answerForm.get("content")?.value;
          editAnswer.tags = this.tagInputComponent.tagList;
          this.answerService.editAnswer(editAnswer).subscribe({next:(data)=>{
            this.tagInputComponent.tagList = [];
            this.onPopupClose.emit(true);

            window.location.reload();
          },
          error:(err)=>{
            console.error(err.message);
          }})
        }
        else
        {
          let newAnswer: AddAnswerModel  = {} as AddAnswerModel;
          newAnswer.questionId = this.questionId??"";
          newAnswer.content = this.answerForm.get("content")?.value;
          newAnswer.createdBy =  this.userService.getUserId();
          newAnswer.tags = this.tagInputComponent.tagList;
          this.answerService.addAnswer(newAnswer).subscribe({next:(data)=>{
            this.onAnswerAdded.emit(data["answer"]);
            this.sendNotificationsToUser(data["answer"]._id)
            
          },
          error:(err)=>{
            console.error(err.message);
          }})
        }
  }

  sendNotificationsToUser(answerId: string)
  {
    this.notificationService.getNotifiableUserWhenAnswerAdded(this.userService.getUserId(), answerId).subscribe({
      next: (data)=>{
        let ids = data["uniqUserIds"];
        for(let i=0;i<ids.length; i++)
          {
            if(ids[i]==this.userService.getUserId()) continue;
            this.addNotification(ids[i], answerId);
          }
      },
      error: (err)=>{
        console.error(err.message);
      }
    })
  }

  addNotification(userId:string, answerId: string)
  {
     let notificationModel : NotificationModel = {} as NotificationModel;
     notificationModel.userId = userId;
     notificationModel.message = `${this.userService.getUserName()} added answer`
     notificationModel.link = `/answer/${this.questionId}`;
     this.notificationService.addNotification(notificationModel).subscribe({
      next:(data)=>{

        this.socketService.emit("notification",data["notification"]);
      }
     })

  }
}
