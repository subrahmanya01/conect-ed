import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationModel } from 'src/app/interfaces/chat';
import { AddQuestionModel, EditQuestionModel, QuestionModel } from 'src/app/interfaces/question';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnChanges {
    
  questionForm : FormGroup;
  tags : string [] = [];
  
  @Input() isEdit:boolean = false;
  @Input() data: QuestionModel = {} as QuestionModel;
  @ViewChild('tagInput') tagInputComponent : any;

  @Output() modalClosed: any =  new EventEmitter();

  constructor(private questionService : QuestionService, public formbuilder:FormBuilder, private router : Router,
     private userService : UserService, private notificationService: NotificationService, private socketService: SocketService)
  {
    if(this.isEdit)
      {
        this.questionForm = this.formbuilder.group({
          title : [this.data.title, Validators.required],
          content : [this.data.content, Validators.required]
        })
      }
      else
      {
        this.questionForm = this.formbuilder.group({
          title : ['', Validators.required],
          content : ['', Validators.required]
        })
      }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.isEdit)
      {
        this.questionForm = this.formbuilder.group({
          title : [this.data.title, Validators.required],
          content : [this.data.content, Validators.required]
        })
        this.tagInputComponent.tagList = this.data.tags;
      }
      else
      {
        this.questionForm = this.formbuilder.group({
          title : ['', Validators.required],
          content : ['', Validators.required]
        })
      }
  }

  onButtonClick()
  {
    this.tagInputComponent.tagList = [];
    this.modalClosed.emit(true);
  }

  public submit()
  {
       if(!this.questionForm.valid) return;
        if(this.isEdit)
          {
              let editQuestion: EditQuestionModel  = {} as EditQuestionModel;
              editQuestion._id  = this.data._id;
              editQuestion.title = this.questionForm.get("title")?.value;
              editQuestion.content = this.questionForm.get("content")?.value;
              editQuestion.tags = this.tagInputComponent.tagList;
              this.questionService.editQuestion(editQuestion).subscribe({next:(data)=>{
                this.router.navigateByUrl("/");
                this.tagInputComponent.tagList = [];
                this.modalClosed.emit(true);
                 window.location.reload();
              },
              error:(err)=>{
                console.error(err.message);
              }})
          }
          else
          {
              let newquestion: AddQuestionModel  = {} as AddQuestionModel;
              newquestion.title = this.questionForm.get("title")?.value;
              newquestion.content = this.questionForm.get("content")?.value;
              newquestion.tags = this.tagInputComponent.tagList;
              newquestion.createdBy =  this.userService.getUserId();
              this.questionService.AddQuestion(newquestion).subscribe({next:(data)=>{
                this.sendNotificationsToRespective(data["question"]["_id"]);
                this.router.navigateByUrl("/");
              },
              error:(err)=>{
                console.error(err.message);
              }})
          }
  }

  sendNotificationsToRespective(questionId:string)
  {
    this.notificationService.getNotifiableUserWhenQuestionAdded(this.userService.getUserId(), questionId).subscribe({
      next:(data)=>{
        let userIds = data["uniqUserIds"];
        userIds.forEach((id:string)=>{
          if(id!=this.userService.getUserId())
            {
              this.addNotification(id, questionId);
            }
        })
      },
      error: (err)=>{
        console.log(err.message);
      }
    })
  }

  addNotification(userId:string, questionId: string)
  {
     let notificationModel : NotificationModel = {} as NotificationModel;
     notificationModel.userId = userId;
     notificationModel.message = `${this.userService.getUserName()} asked question`
     notificationModel.link = `/answer/${questionId}`;
     this.notificationService.addNotification(notificationModel).subscribe({
      next:(data)=>{

        this.socketService.emit("notification",data["notification"]);
      }
     })

  }
}
