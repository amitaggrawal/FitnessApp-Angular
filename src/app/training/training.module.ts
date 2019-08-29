import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { TrainingComponent } from './training.component';
import { NewTrainingsComponent } from './new-trainings/new-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
    declarations: [
        TrainingComponent,
        NewTrainingsComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports: [
        AngularFirestoreModule,
        SharedModule,
        TrainingRoutingModule
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}