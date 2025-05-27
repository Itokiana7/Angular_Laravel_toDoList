import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

export const routes: Routes = [
    {path : '',redirectTo : 'login', pathMatch:'full'},
    {path : 'register', component : RegisterComponent},
    {path : 'login', component : LoginComponent},
    {path : 'todo', component : ToDoListComponent}
];
