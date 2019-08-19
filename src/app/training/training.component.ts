import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  exerciseSubscription: Subscription;
  trainingStarted = false;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseSubscription = this.exerciseService.exerciseChanged.subscribe(exercise => {
      if (exercise){
        this.trainingStarted = true;
      }else{
        this.trainingStarted = false;
      }
    });
  }

}
