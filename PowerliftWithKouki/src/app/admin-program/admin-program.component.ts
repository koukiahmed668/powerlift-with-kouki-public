import { Component } from '@angular/core';
import { ExerciceService } from '../services/exercic.service'
import { ProgramService } from '../services/program.service';

interface Week {
  numDays: number;
  days: { exercises: { name: string; sets: number; reps: number; rest: number }[] }[];
}

@Component({
  selector: 'app-admin-program',
  templateUrl: './admin-program.component.html',
  styleUrl: './admin-program.component.css'
})
export class AdminProgramComponent {

  exercices:any []=[];
  programs: any[] = [];
  searchQuery: string = '';
  showCreateProgramForm: boolean = false;
  newProgram: any[] = [];
  weeks: Week[] = [];
  numWeeks: number = 1; // Default number of weeks
  numDays: number = 7; // Defaulting to 7 days
  days: number[] = Array.from({ length: 7 }, (_, i) => i + 1); // Assuming a week has 7 days


  constructor(private exerciceService:ExerciceService, private programService: ProgramService) {
    
  }

  ngOnInit(): void {
    this.getExercices();
    this.getPrograms();
  }

  getExercices(): void {
    this.exerciceService.getAllExercices().subscribe(
    exercices=>{
      this.exercices=exercices;
    }
  )
  }

  getPrograms(): void {
    this.programService.getAllPrograms().subscribe(
      programs => {
        this.programs = programs;
        console.log(programs);
      },
      error => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  generateArray(length: number): any[] {
    return Array(length).fill(0);
  }

  createProgram(): void {
    const programRequest: any = {
      weeks: this.weeks.map((week) => ({
        durationInDays: week.numDays,
        days: week.days.filter(day => day.exercises.length > 0).map((day) => ({
          exerciseInstances: day.exercises.map((exercise) => ({
            exerciseId: exercise.name, // Assuming exercise.name contains the ID
            sets: exercise.sets,
            reps: exercise.reps,
            restTimeInSeconds: exercise.rest
          }))
        }))
      }))
    };
    
    console.log('Program Creation Request:', programRequest); // Log the request to verify its structure

      this.programService.createProgram(programRequest).subscribe(() => {
      this.newProgram = []; // Clear the newProgram array after submission
        this.toggleCreateProgramForm(); // Hide the form after submission
    });

  }


  addWeek() {
    this.weeks.push({
      numDays: 1,
      days: Array.from({ length: this.numDays }, () => ({ exercises: [], sets: 0, reps: 0, rest: 0 }))
    });
  }
  
  
  

  addExercise(weekIndex: number, dayIndex: number) {
    this.weeks[weekIndex].days[dayIndex].exercises.push({ name: '', sets: 0, reps: 0, rest: 0 });
  }
  

  removeWeek(index: number) {
    this.weeks.splice(index, 1);
  }


  searchExercices(): void {
    if (this.searchQuery.trim() !== '') {
      this.exerciceService.searchExercices(this.searchQuery).subscribe(
        exercices => {
          this.exercices = exercices;
        }
      );
    }
  }

  toggleCreateProgramForm() {
    this.showCreateProgramForm = !this.showCreateProgramForm;
  }

}
