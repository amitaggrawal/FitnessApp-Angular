import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  minDate;

  constructor() { }

  ngOnInit() {
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
  }

  signup(formValue){
    console.log(formValue);
  }
}
