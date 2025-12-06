import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ResetPassword } from './pages/reset-password/reset-password';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddTask } from './pages/add-task/add-task';
import { EditTask } from './pages/edit-task/edit-task';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'reset-password', component: ResetPassword },
  { path: 'add', component: AddTask },
  { path: 'edit/:id', component: EditTask },
];