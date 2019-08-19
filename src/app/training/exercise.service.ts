import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class ExerciseService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunshes', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'Yoga', name: 'Yoga', duration: 120, calories: 8 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 60, calories: 18 },

    ];

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];

    exerciseChanged = new Subject<Exercise>();

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
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


    getCompletedOrCancelledExercises(){
        return this.exercises.slice(); 
    }
}