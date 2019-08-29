import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import UIService from 'src/app/shared/ui.service';

@Injectable()
export class ExerciseService {
    // private availableExercises: Exercise[] = [
    //     { id: 'crunches', name: 'Crunshes', duration: 30, calories: 8 },
    //     { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    //     { id: 'Yoga', name: 'Yoga', duration: 120, calories: 8 },
    //     { id: 'side-lunges', name: 'Side Lunges', duration: 60, calories: 18 },

    // ];
    private availableExercises: Exercise[] = [];

    private runningExercise: Exercise;
    private fbSubscription: Subscription[] = [];

    exerciseChanged = new Subject<Exercise>();
    exercisesChanged$ = new Subject<Exercise[]>();
    finishedExercisesChanged$ = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore, private uiService: UIService) { }
    // getAvailableExercises() {
    //     return this.availableExercises.slice();
    // }
    fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);
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
                this.uiService.loadingStateChanged.next(false);
                this.availableExercises = exercises;
                this.exercisesChanged$.next([...this.availableExercises]);
            }, (error) => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackbar("Fetching exercises failed. Please try again later.", null, {
                    duration: 3000
                });

                this.exercisesChanged$.next(null);
            })
        );
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }


    fetchCompletedOrCancelledExercises() {
        this.fbSubscription.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged$.next(exercises);
        }));
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db
            .collection('finishedExercises')
            .add(exercise);
    }

    cancelSubscritions(){
        this.fbSubscription.forEach(fbSubs => fbSubs.unsubscribe());
    }
}