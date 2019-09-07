import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTraining from './training.reducer'
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit{

  // exerciseSubscription: Subscription;
  // trainingStarted = false;
  ongoingTraining: Observable<boolean>

  constructor(private exerciseService: ExerciseService, private strore: Store<fromTraining.State>) { }

  ngOnInit() {
    this.ongoingTraining = this.strore.select(fromTraining.getIsTraining);
    // this.exerciseSubscription = this.exerciseService.exerciseChanged.subscribe(exercise => {
    //   if (exercise) {
    //     this.trainingStarted = true;
    //   } else {
    //     this.trainingStarted = false;
    //   }
    // });
  }
}
