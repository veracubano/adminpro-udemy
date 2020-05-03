import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenASubir: File;
  imagenTemporal: string | ArrayBuffer;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  guardar(usuarioDelForm: Usuario) {
    // console.log(usuarioDelForm);
    // console.log('Google:' + this.usuario.google);
    this.usuario.nombre = usuarioDelForm.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuarioDelForm.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario)
                .subscribe();
  }

  seleccionImagen(archivo: File) {
    // console.log(archivo);
    if (!archivo) {
      this.imagenASubir = null;
      return;
    }
    // console.log(archivo);
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Solo imágenes',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });
      this.imagenASubir = null;
      return;
    }
    this.imagenASubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      // console.log(reader.result);
      this.imagenTemporal = reader.result;
    };
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenASubir, this.usuario._id);
  }

}
