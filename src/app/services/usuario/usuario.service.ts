import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable, throwError} from 'rxjs';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    // console.log('Servicio de usuario listo');
    this.cargarDelStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false; // debo recordar que en esta línea de código está un ciclo if, si se cumple la condición devuelve "true" y si no se cumple la condición devuelve "false"
  }

  cargarDelStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token: token})
                  .map((resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                    console.log(resp);
                    return true;
                  });
  }

  login(usuario: Usuario, recordar: boolean = false) {
     if (recordar) {
       localStorage.setItem('email', usuario.email);
     } else {
       localStorage.removeItem('email');
     }

     let url = URL_SERVICIOS + '/login';
     return this.http.post(url, usuario)
                  .map((resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                    return true;
                  })
                  .catch(err => {
                    // console.log(err.error.mensaje);
                    Swal.fire({
                      title: 'Error en el login',
                      text: err.error.mensaje,
                      icon: 'error'
                    });
                    return throwError(err.error.mensaje);
                  });
  }

  crearUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario';
     return this.http.post(url, usuario)
             .map((resp: any) => {
              Swal.fire({
                title: 'Usuario creado',
                text: usuario.email,
                icon: 'success'
              });
              return resp.usuario;
            })
            .catch(err => {
              // console.log(err.error.mensaje);
              Swal.fire({
                title: err.error.mensaje,
                text: err.error.errors.message,
                icon: 'error'
              });
              return throwError(err.error.mensaje);
            });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    // console.log(url);
    return this.http.put(url, usuario)
                  .map((resp: any) => {
                    if (usuario._id === this.usuario._id) {
                      let usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                    }
                    Swal.fire({
                      title: 'Usuario actualizado',
                      text: usuario.nombre,
                      icon: 'success'
                    });
                    return true;
                  })
                  .catch(err => {
                    // console.log(err.error.mensaje);
                    Swal.fire({
                      title: err.error.mensaje,
                      text: err.error.errors.message,
                      icon: 'error'
                    });
                    return throwError(err.error.mensaje);
                  });
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then((resp: any) => {
            // console.log(resp);
            this.usuario.img = resp.usuario.img;
            Swal.fire({
              title: 'Imagen actualizada',
              text: this.usuario.nombre,
              icon: 'success'
            });
            this.guardarStorage(id, this.token, this.usuario, this.menu);
          })
          .catch(resp => {
            console.log(resp);
          });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios (termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
                  .map((resp: any) => resp.usuarios);
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url);
  }

}
