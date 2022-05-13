import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  startButton=true; //to enable button
  username="";
  constructor(
    private location:Location
  ) {}

  checkName(){ //checks if name is entered to allow button to work
    if(this.username.trim().length>0){
      this.startButton=false;
    } else {
      this.startButton=true;
    }

  }


}
