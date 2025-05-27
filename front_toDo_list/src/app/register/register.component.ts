import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm! : FormGroup;
  private _NFB = inject(NonNullableFormBuilder); 
  private _router = inject(Router);
  private _dataService = inject(DataService);
  constructor(){
    this.registerForm = this._NFB.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    });
  }
onRegister(){
    this._dataService.register(this.registerForm.value).subscribe({
      next: (data) => {
        console.log("register : ",data.message);
        
        this._router.navigate(['login']);
      },
      error: (err) => {
        console.log("error : ", err.message);
      }
    })
    
  }
}
