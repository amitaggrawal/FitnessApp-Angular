import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DebugRenderer2 } from '@angular/core/src/view/services';

@Injectable()
export default class UIService{
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar){}

    showSnackbar(message, action, duration){
        this.snackbar.open(message, action, {
            duration: duration
        });
    }
}