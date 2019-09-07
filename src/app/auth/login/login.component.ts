import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import * as fromRoot from '../../app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: AuthData;
  isLoading: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoading = this.store.select(fromRoot.getIsLoading)
  }

  login(formValue) {
    this.credentials = {
      "email": formValue.emailID,
      "password": formValue.password
    }

    this.authService.loginUser(this.credentials);
  }

}
