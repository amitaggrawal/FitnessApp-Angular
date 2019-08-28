import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: AuthData;

  constructor(private authService: AuthService) { }
  
  ngOnInit() {
  }

  login(formValue){
    this.credentials = {
      "email": formValue.emailID,
      "password": formValue.password
    }
   
    this.authService.loginUser(this.credentials);
  }
}
