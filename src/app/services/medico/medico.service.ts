import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
                  .map((resp: any) => {
                    this.totalMedicos = resp.total;
                    // console.log(resp.medicos);
                    return resp.medicos;
                  });
  }

  cargarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
                  .map((resp: any) => resp.medico);
  }

  buscarMedicos (termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
                  .map((resp: any) => resp.medicos);
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                  .map(resp => {
                    Swal.fire({
                      title: 'Médico borrado',
                      text: 'El médico ha sido eliminado correctamente',
                      icon: 'success'
                    });
                  });
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    if (medico._id) { // si existe en la base de datos un médico con este "id" significa que necesito actualizar médico
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico)
                    .map((resp: any) => {
                      Swal.fire({
                        title: 'Médico actualizado',
                        text: medico.nombre,
                        icon: 'success'
                      });
                      return resp.medico;
                    });

    } else { // de lo contrario necesito crear médico
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
                    .map((resp: any) => {
                      Swal.fire({
                        title: 'Médico creado',
                        text: medico.nombre,
                        icon: 'success'
                      });
                      return resp.medico;
             });
    }

  }

}
