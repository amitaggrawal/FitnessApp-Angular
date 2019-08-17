import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-trainings',
  templateUrl: './new-trainings.component.html',
  styleUrls: ['./new-trainings.component.css']
})
export class NewTrainingsComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  startTraining(){
    this.trainingStart.emit();
  }

}
