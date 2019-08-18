import { Subject } from 'rxjs';
import { User } from './user.mode';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private user: User;
    public authChange = new Subject<boolean>();

    constructor(private router: Router){}

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.afterAuthSuccess()
    }

    loginUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.afterAuthSuccess()
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/']);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    afterAuthSuccess(){
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}