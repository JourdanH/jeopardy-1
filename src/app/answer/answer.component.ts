import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JeopardyService } from '../jeopardy.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Output()
  updateQuestion = new EventEmitter<any>();

  @Input() questionInfo;
  answerValue;
  isCorrect: boolean;
  score=0;
  constructor(private jeopardyService: JeopardyService){}
  ngOnInit() {
  }

  getDataFromService(){
      this.jeopardyService.getQuestionInfo()
      .subscribe(
        questionInfo => {
          this.questionInfo = questionInfo[0];
        }
      )
    }
  onSubmit(){
    if(this.answerValue.toLowerCase() == this.questionInfo.answer.toLowerCase()){
      this.score += this.questionInfo.value;
      this.answerValue = "";
      this.updateQuestion.emit(this.getDataFromService());
      return this.isCorrect = true;
    } else {
      this.answerValue = "";
      this.updateQuestion.emit(this.getDataFromService());
    return this.isCorrect = false;
    }
  }
}
