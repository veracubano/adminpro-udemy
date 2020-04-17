import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    PagesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
