import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-trainings',
  templateUrl: './new-trainings.component.html',
  styleUrls: ['./new-trainings.component.css']
})
export class NewTrainingsComponent implements OnInit {

  // @Output() trainingStart = new EventEmitter<void>(); // Replaced with evnets in service.

  // exercises: Exercise[];

  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  exerciseSubscription: Subscription;
  exerciseLoadingSubscription;
  // exerciseIsLoading = true;

  constructor(private exerciseService: ExerciseService, private uiService: UIService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    // this.exercises = this.exerciseService.getAvailableExercises();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();

    // this.exerciseSubscription = this.exerciseService.exercisesChanged$.subscribe(exercises => this.exercises = exercises);

    // this.exerciseLoadingSubscription = this.uiService.loadingStateChanged.subscribe((state) => {
    //   this.exerciseIsLoading = state;
    // });

  }

  fetchExercises() {
    this.exerciseService.fetchAvailableExercises();
  }
  startTraining(exerciseFormData: NgForm) {
    // this.trainingStart.emit();
    console.log(exerciseFormData.value);
    this.exerciseService.startExercise(exerciseFormData.value.exercise);
  }

}
