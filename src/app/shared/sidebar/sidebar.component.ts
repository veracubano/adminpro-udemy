import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;

  constructor(public _sidebar: SidebarService, public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario; // usuario que está logueado, se mostrará la información en el html de este usuario
    this._modalUploadService.notificacion.subscribe(resp => {
      // console.log(resp);
      if (resp.usuario) {
        if (resp.usuario.email === this.usuario.email) { // si no se hace esta condición se cambiará siempre la imagen del header para cualquier usuario, y lo que queremos es que se pueda cambiar la imagen del header únicamente del usuario que esté logueado, o sea, del usuario desde el cual se hace el cambio de imagen
          this.usuario = resp.usuario;
        }
      }
    });
  }

}
