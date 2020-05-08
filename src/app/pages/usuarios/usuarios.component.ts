import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargandoUsuarios();
    this._modalUploadService.notificacion
                .subscribe(resp => {
                      // console.log(resp);
                      this.cargandoUsuarios();
                });
  }

  mostrandoModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargandoUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
                .subscribe((resp: any) => {
                  // console.log(resp);
                  this.totalRegistros = resp.total;
                  this.usuarios = resp.usuarios;
                  this.cargando = false;
                });
  }

  cambiandoDesde(valor: number) {
    let desde = this.desde + valor;
    // console.log (desde);
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargandoUsuarios();
  }

  buscandoUsuario(termino: string) {
    // console.log(termino);
    if (termino.length <= 0) {
      this.cargandoUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
              .subscribe((usuariosBuscados: Usuario[]) => {
                // console.log(usuariosBuscados);
                this.usuarios = usuariosBuscados;
                this.cargando = false;
              });
  }

  borrandoUsuario(usuario: Usuario) {
    // console.log(usuario);
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire({
        title: 'No puede borrar usuario',
        text: 'No puede borrarse a sí mismo',
        icon: 'error'
      });
      return;
    }
    Swal.fire({
      title: 'Está seguro?',
      text: "No es posible revertir esta orden!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
                  .subscribe(usuarioABorrar => {
                    // console.log(usuarioABorrar);
                    this.cargandoUsuarios();
                  });
        Swal.fire(
          'Felicidades!',
          'El usuario ha sido borrado',
          'success'
        );
      }
    });
  }

  guardandoUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
              .subscribe();
  }

}
