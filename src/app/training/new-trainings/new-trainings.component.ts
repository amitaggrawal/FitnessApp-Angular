import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import UIService from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-trainings',
  templateUrl: './new-trainings.component.html',
  styleUrls: ['./new-trainings.component.css']
})
export class NewTrainingsComponent implements OnInit, OnDestroy {

  // @Output() trainingStart = new EventEmitter<void>(); // Replaced with evnets in service.

  exercises: Exercise[];
  exerciseSubscription: Subscription;
  exerciseLoadingSubscription;
  exerciseIsLoading = true;
  constructor(private exerciseService: ExerciseService, private uiService: UIService) { }

  ngOnInit() {
    // this.exercises = this.exerciseService.getAvailableExercises();
    this.exerciseSubscription = this.exerciseService.exercisesChanged$.subscribe(exercises => this.exercises = exercises);
   
    this.exerciseLoadingSubscription = this.uiService.loadingStateChanged.subscribe((state) => {
      this.exerciseIsLoading = state;
    });

    this.fetchExercises();
  }

  fetchExercises(){
    this.exerciseService.fetchAvailableExercises();
  }
  startTraining(exerciseFormData: NgForm) {
    // this.trainingStart.emit();
    console.log(exerciseFormData.value);
    this.exerciseService.startExercise(exerciseFormData.value.exercise);
  }

  ngOnDestroy(){
    if(this.exerciseSubscription != null){
      this.exerciseSubscription.unsubscribe();
    }
    if(this.exerciseLoadingSubscription != null){
      this.exerciseLoadingSubscription.unsubscribe();
    }
  }
}
