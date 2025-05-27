import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Tache } from '../interfaces/tache';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
toDoForm !: FormGroup;
listToDo : Tache[] = [];
count !: number;
_dataService = inject(DataService);
private NFB = inject(NonNullableFormBuilder);

constructor(){
  this.toDoForm = this.NFB.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
  });
  this.getAllToDoList();
}
getAllToDoList(){
  this._dataService.getAllToDo().subscribe({
    next: (data) => {
      this.listToDo = data;
    },
    error: (err) => {
      console.log("error : ", err.message);
    }
  });
}

getCount():number{
  return this.listToDo.length;
}
onAdd(){
  
}
}
