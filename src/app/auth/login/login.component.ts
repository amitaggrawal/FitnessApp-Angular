import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import UIService from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  credentials: AuthData;
  isLoading = false;
  private loadingSubscription: Subscription;
  constructor(private authService: AuthService, private uiService:UIService) { }
  
  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe((state) => {
      this.isLoading = state;
    });
  }

  login(formValue){
    this.credentials = {
      "email": formValue.emailID,
      "password": formValue.password
    }
   
    this.authService.loginUser(this.credentials);
  }

  ngOnDestroy(){
    if(this.loadingSubscription != null){
      this.loadingSubscription.unsubscribe();
    }
  }
}
