import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-trainings',
  templateUrl: './new-trainings.component.html',
  styleUrls: ['./new-trainings.component.css']
})
export class NewTrainingsComponent implements OnInit {

  // @Output() trainingStart = new EventEmitter<void>(); // Replaced with evnets in service.

  exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getAvailableExercises();
  }

  startTraining(exerciseFormData: NgForm){
    // this.trainingStart.emit();
    console.log(exerciseFormData.value);
    this.exerciseService.startExercise(exerciseFormData.value.exercise);
  }

}
