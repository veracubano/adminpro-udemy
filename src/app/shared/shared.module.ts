import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router'; // se importó para poder utilizar con el routrLink en el archivo "sidebar.component.html"
import { CommonModule } from '@angular/common'; // se importó para poder utilizar el "*ngFor" en el archivo "sidebar.component.html"

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';



@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent
  ]
})
export class SharedModule { }
