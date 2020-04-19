import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService  ) { }

  ngOnInit(): void { // cuando la página sea cargada se dispara la función "colocarCheck()" que está en este propio archivo
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    console.log(tema);
    console.log(link);
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck( link: any ) {
    let selectores: any = document.getElementsByClassName('selector'); // "selectores" es un arreglo donde tengo todos los elementos del archivo "account-settings.components.html" que tienen la clase "selector"
    for ( let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for ( let ref of selectores) {
      if ( ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
