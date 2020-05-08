import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargandoHospitales();
    this._modalUploadService.notificacion
              .subscribe(() => this.cargandoHospitales());
  }

  cargandoHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
                .subscribe(hospitales => {
                  this.hospitales = hospitales;
                });
  }

  guardandoHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
              .subscribe();
  }

  buscandoHospital(termino: string) {
    // console.log(termino);
    if (termino.length <= 0) {
      this.cargandoHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospitales(termino)
              .subscribe((hospitalesBuscados: Hospital[]) => {
                // console.log(usuariosBuscados);
                this.hospitales = hospitalesBuscados;
                this.cargando = false;
              });
  }

  borrandoHospital(hospital: Hospital) {
    // console.log(hospital);
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
              this._hospitalService.borrarHospital(hospital._id)
                            .subscribe(hospitalABorrar => {
                              // console.log(hospitalABorrar);
                              this.cargandoHospitales();
                            });
          }
    });
  }

  creandoHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((valor) => {
      if ( !valor.value || valor.value.length === 0) {
        return;
      }
      this._hospitalService.crearHospital( valor.value )
            .subscribe( () => this.cargandoHospitales());
    });
  }

  actualizandoImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);

  }

}
