import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { UIService } from 'src/app/shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';

@Injectable()
export class ExerciseService {

    private fbSubscription: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) { }

    fetchAvailableExercises() {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.fbSubscription.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                            // name: doc.payload.doc.data().name,
                            // duration: doc.payload.doc.data().duration,
                            // calories: doc.payload.doc.data().calories
                        };
                    });
                })
            )
            .subscribe((exercises: Exercise[]) => {
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Training.SetAvailableTraining(exercises));
                // this.availableExercises = exercises;
                // this.exercisesChanged$.next([...this.availableExercises]);
            }, (error) => {
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar("Fetching exercises failed. Please try again later.", null, {
                    duration: 3000
                });

                // this.exercisesChanged$.next(null);
            })
        );
    }

    startExercise(selectedId: string) {
        // this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
        // this.exerciseChanged.next({ ...this.runningExercise });
        this.store.dispatch(new Training.StartTraining(selectedId))
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
            this.addDataToDatabase({ ...exercise, date: new Date(), state: 'completed' });
            this.store.dispatch(new Training.StopTraining());

        });
        // this.runningExercise = null;
        // this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {

        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
            this.addDataToDatabase({
                ...exercise,
                duration: exercise.duration * (progress / 100),
                calories: exercise.calories * (progress / 100),
                date: new Date(), state: 'cancelled'
            });
            this.store.dispatch(new Training.StopTraining());

        });

    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubscription.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            // this.finishedExercisesChanged$.next(exercises);
            this.store.dispatch(new Training.SetFinishedTraining(exercises));
        }));
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db
            .collection('finishedExercises')
            .add(exercise);
    }

    cancelSubscritions() {
        this.fbSubscription.forEach(fbSubs => fbSubs.unsubscribe());
    }
}