import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm!: FormGroup;
private NFB = inject(NonNullableFormBuilder);
private _router = inject(Router);
private _dataService = inject(DataService);

constructor(){
  this.loginForm = this.NFB.group({
    name: ['', [Validators.required,Validators.minLength(3)]],
    password: ['', [Validators.required]]
  })
}

onLogin(){
  this._dataService.login(this.loginForm.value).subscribe({
    next : (data) => {
      console.log("Login : ", data.message);
      this._router.navigate(['/todo']);
    },
    error : (err) => {
      console.log("Error : ", err.message);
      
    }
  })
}
}
