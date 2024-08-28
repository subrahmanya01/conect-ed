import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { AnswersComponent } from './answers/answers.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddAnswerComponent } from './add-answer/add-answer.component';


@NgModule({
  declarations: [
    OverviewComponent,
    AnswersComponent,
    AskQuestionComponent,
    AddAnswerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:
  [
    OverviewComponent,
    AnswersComponent,
    AskQuestionComponent,
    AddAnswerComponent
  ]
})
export class MainModule { }
