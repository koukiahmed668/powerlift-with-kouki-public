import { Component, OnInit } from '@angular/core'
import { ExerciceService } from '../services/exercic.service'
import { ProgramService } from '../services/program.service';

interface Week {
  numDays: number;
  days: { exercises: { name: string; sets: number; reps: number; rest: number }[] }[];
}



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] 
})
export class AdminComponent implements OnInit {
  exercices:any []=[];
  programs: any[] = [];
  newExercice: any = {}; // Object to hold the new exercise data
  showAddExerciseForm: boolean = false; // Variable to control the visibility of the form
  searchQuery: string = '';

  constructor(private exerciceService:ExerciceService, private programService: ProgramService) {
    
  }

  ngOnInit(): void {
    this.getExercices();
  }

  getExercices(): void {
    this.exerciceService.getAllExercices().subscribe(
    exercices=>{
      this.exercices=exercices;
    }
  )
  }

  createExercice(): void {
    if (this.newExercice) {
      this.exerciceService.createExercice(this.newExercice).subscribe(() => {
        this.getExercices(); 
        this.newExercice = {}; 
        this.toggleAddExerciseForm();
      });
    }
  }

  toggleAddExerciseForm(): void {
    this.showAddExerciseForm = !this.showAddExerciseForm;
    if (!this.showAddExerciseForm) {
      this.newExercice = {};
    }
  }
  
  deleteExercice(id: number): void {
    this.exerciceService.deleteExercice(id)
      .subscribe(() => {
        this.getExercices();
      });
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


  




}
