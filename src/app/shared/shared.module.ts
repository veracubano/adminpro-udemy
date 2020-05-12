import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router'; // se importó para poder utilizar con el routrLink en el archivo "sidebar.component.html"
import { CommonModule } from '@angular/common'; // se importó para poder utilizar el "*ngFor" en el archivo "sidebar.component.html"

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// PipesModule
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    ModalUploadComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    ModalUploadComponent
  ]
})
export class SharedModule { }
