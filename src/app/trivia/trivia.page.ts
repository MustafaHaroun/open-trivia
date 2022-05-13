import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainService} from '../main.service';
import {Location} from '@angular/common';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage implements OnInit {
  @ViewChild('pieCanvas') pieCanvas; // to have control on piechart
  pieChart: any;
  done=false; //variable to indicate that the quiz is done
  results=[]; //array to store quiz results
  questions=[]; //array of questions
  currentQuestion=1; //keep track of current question
  constructor(
    private location:Location,
    private main:MainService
  ) {

  }

  ngOnInit() {
    this.main.getQuestions().subscribe(data=>{
      this.questions = data.results.sort(() => 0.5 - Math.random()).slice(0, 5); //take 5 random questions from API
      console.log(this.questions);


    })
  }
  backClicked() {
    this.location.back(); //go back to previous page
  }
  checkAnswer(answer){
    if(this.questions[this.currentQuestion-1].correct_answer === answer){ //if answer is correct
      this.results.push("correct") //mark the answer as correct
      if(this.currentQuestion+1<6){ //go to next question if current question is not the last question
        this.currentQuestion++;
      } else if(this.currentQuestion+1==6){ //stop questions and create chart once questions are done
        this.done=true
        this.createChart();
      }

    } else { //same procedure but for wrong answers
      this.results.push("wrong");
      if(this.currentQuestion+1<6){
        this.currentQuestion++;
      } else if(this.currentQuestion+1==6){
        this.done=true
        this.createChart();
      }

    }

  }
  newQuiz(){
  window.location.reload() //create new quiz by reloading page
}
  createChart(){
    var correctPercentage;
    var wrongPercentage;
    var correctCount=0;
    this.results.forEach(element => {
      if(element=='correct'){ //count number of correct answers
        correctCount++;
      }
    });
    correctPercentage = correctCount / 5 * 100 //calculate percentage of correct answers
    wrongPercentage = 100 - correctPercentage;//calculate percentage of wrong answers


    this.pieChart = new Chart(this.pieCanvas.nativeElement, { //create chart
      type: 'pie',
      data: {
        labels: ['Correct','Wrong'],
        datasets: [{
          label: 'Results',
          data: [correctPercentage, wrongPercentage],
          backgroundColor: [
            'rgb(0,128,0)',
            'rgb(255, 0, 0)'
          ]
        }]
      }
    });
  }


}
