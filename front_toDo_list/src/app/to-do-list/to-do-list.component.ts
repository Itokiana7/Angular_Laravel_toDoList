import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Tache } from '../interfaces/tache';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
_router = inject(Router)
private NFB = inject(NonNullableFormBuilder);

constructor(){
  this.toDoForm = this.NFB.group({
    nom: ['',[Validators.required,Validators.minLength(3)]],
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
  this._dataService.addTodo(this.toDoForm.value).subscribe({
    next: (data) =>{
      this.getAllToDoList();
      console.log(data.data);
      this.toDoForm.reset();
    },

    error: (err) =>{
      console.log('error : ', err.message);
    }

  });
}

onDelete(id : number){
  
  this._dataService.deleteTodo(id).subscribe({
    next : (data) =>{
      this.getAllToDoList();
    },
    error : (err) =>{
      console.log(err.message);
      
    }
  });

}

  onDeconnexion(){
    this._dataService.logout().subscribe({
      next : (data) =>{
        sessionStorage.removeItem('token');
        this._router.navigate(['/login']);
      },
      error : (err) =>{
        console.log("Erreur ");
      }
    })
  }
}
