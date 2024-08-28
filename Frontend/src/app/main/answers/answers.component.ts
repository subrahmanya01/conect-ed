import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerModel } from 'src/app/interfaces/answers';
import { ApiResponseModel } from 'src/app/interfaces/api-response-model';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  questionId : string|null ="";
  answers: AnswerModel[] = []
  question: QuestionModel = {} as QuestionModel;
  doEdit: boolean = false;
  currentlySelectedQuestionForEdit: AnswerModel = {} as AnswerModel;


  constructor(private route: ActivatedRoute, private answerService : AnswerService, 
    private questionService : QuestionService, public userService : UserService)
  {

  }


  onEditClick(answer: AnswerModel)
  {
    this.doEdit = true;
    this.currentlySelectedQuestionForEdit = answer;
  }

  onClose()
  {
    this.doEdit = false;
    this.currentlySelectedQuestionForEdit = {} as AnswerModel;
  }
 

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.questionId = params.get('id');
      console.log(params);
      this.getQuestion(this.questionId??'');
      this.getAnswers();
    });
  }

  getQuestion(questionId: string)
  {
     this.questionService.getQuestionByQuestionId(questionId).subscribe({
      next: (data : ApiResponseModel)=>{
        this.question = data["question"];
      },
      error: (err)=>{
        console.error(err.message);
      }
     })
  }

  getAnswers()
  { 
    this.answerService.getAnswerByQuestionId(this.questionId??"").subscribe({
      next:(data:ApiResponseModel)=>{
          this.answers = data["answers"].reverse();
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  } 

  onAnswerAdded(answer: AnswerModel)
  {
    this.answers.unshift(answer);
  }

  deleteAnswer(answerId : string)
  {
      this.answerService.deleteAnswer(answerId).subscribe({
        next: (data)=>{
          console.log("Answer Deleted successfully");
          window.location.reload();
        },
        error:(err)=>{
          console.error(err.message);
      }
      })
  }

}
