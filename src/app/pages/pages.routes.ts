import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent} from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'} },
      { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del Tema'} },
      { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },

      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'} },
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Médicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Crear/Actualizar Médico'} },
      { path: '', pathMatch: 'full' , redirectTo: '/dashboard' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
