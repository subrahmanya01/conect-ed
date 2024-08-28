import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponseModel } from 'src/app/interfaces/api-response-model';
import { QuestionModel } from 'src/app/interfaces/question';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import { settings } from 'src/assets/appsettings';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public questions : QuestionModel[] = []
  public searchKeyword : string = "";
  public currentlyEditing: QuestionModel = {} as QuestionModel;
  public doEdit: boolean = false;


  constructor(private questionservice : QuestionService, public userService : UserService, private router: Router)
  {

  }
  ngOnInit(): void {
    this.getQuestions()
  }
  onEditClick(qm: QuestionModel)
  {
    this.currentlyEditing = qm;
    this.doEdit= true;
  }

  onPopupClose()
  {
    this.currentlyEditing = {} as QuestionModel;
    this.doEdit= false;
  }

  getQuestions()
  {
    this.questionservice.getQuestions().subscribe({
      next: (data:ApiResponseModel)=>{
        this.questions  = data["questions"];
        console.log(this.questions);
      },
      error: (err) => {
        console.error(err.message);
      }
    })
  }

  deleteQuestion(questionId : string)
  {
    this.questionservice.deleteQuestion(questionId).subscribe({
      next:()=>{
        console.log("Question deleted successfully");
        window.location.reload();
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  } 

  search(keyword: string)
  {
    this.searchKeyword = keyword.trim();

    if(this.searchKeyword.length==0)
      {
        this.getQuestions()
        return;
      }

    this.questionservice.searchQuestions(keyword).subscribe({
      next: (data)=>{
        this.questions = data["questions"];
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  }


}
