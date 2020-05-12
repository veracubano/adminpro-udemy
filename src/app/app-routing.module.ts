import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PagesModule } from './pages/pages.module';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}) // ,
    // PagesModule // este NO PUEDE ESTAR AQUÍ, PUES IMPIDE QUE EL PROYECTO FUNCIONE
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
