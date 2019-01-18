import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/signin/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
