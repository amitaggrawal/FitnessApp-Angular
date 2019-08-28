import { Subject } from 'rxjs';
import { User } from './user.mode';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExerciseService } from '../training/exercise.service';


@Injectable()
export class AuthService {
    private isAuthenticated = false;
    public authChange = new Subject<boolean>();

    constructor(private router: Router, private afAuth: AngularFireAuth, private exerciseService: ExerciseService) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.exerciseService.cancelSubscritions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/']);
            }
        });
    }
    registerUser(authData: AuthData) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };

        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    loginUser(authData: AuthData) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);

            })

    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

}