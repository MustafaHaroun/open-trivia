import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface question{
  category:string,
  question:string,
  correct_answer:boolean
}
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
  ) { }
  getQuestions():Observable<any>{ //get data from API
    return this.http.get<any>("https://opentdb.com/api.php?amount=25&category=9&difficulty=medium&type=boolean");
  }
}
