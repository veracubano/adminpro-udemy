import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any; // para usar la librería llamada "gapi"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_Id: '153734107134-lrf0bj8m8113pojlmfe1hpriasubsca3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      // console.log(profile);
      let token = googleUser.getAuthResponse().id_token;
      // console.log(token);
      this._usuarioService.loginGoogle(token)
              .subscribe(() => window.location.href = '#/dashboard');
    });
  }

  ingresando(forma: NgForm) {
    // (1) console.log('Ingresando ...');
    // (1) this.router.navigate(['/dashboard']);
    // (2) console.log(forma.valid);
    // (2) console.log(forma.value);
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
                .subscribe(correcto => this.router.navigate(['/dashboard']));
  }

}
