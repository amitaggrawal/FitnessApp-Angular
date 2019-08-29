import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import UIService from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  minDate;

  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService:UIService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 18);

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe((state) => {
      this.isLoading = state;
    });
  }

  signup(formValue){
    this.authService.registerUser(formValue);
  }

  ngOnDestroy(){
    if(this.loadingSubscription != null){
      this.loadingSubscription.unsubscribe();
    }
  }
}
