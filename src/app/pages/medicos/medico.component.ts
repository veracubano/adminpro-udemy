import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService,
              public _hospitalService: HospitalService, // por ejemplo, al importar "HospitalService" puedo utilizar los métodos declarados en este servicio, dentro de ellos el método "cargarHospitales()"
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public _modalUploadService: ModalUploadService
  ) {
      activatedRoute.params.subscribe(parametrosPorRuta => { // "parametrosPorRuta" se refiere a los parametros que son enviados en la URL, en este caso se envía el "id"
        let id = parametrosPorRuta['id'];
        if (id !== 'nuevo') {
          this.cargandoMedico(id);
        }
      });
    }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales()
                .subscribe(hospitalesRecibidos => this.hospitales = hospitalesRecibidos);
    this._modalUploadService.notificacion
                .subscribe((resp: any) => {
                  // console.log(resp);
                  this.medico.img = resp.medico.img;
                });
              }

  cargandoMedico(id: string) {
    this._medicoService.cargarMedico(id)
                .subscribe(medicoCargado => {
                  // console.log(medicoCargado);
                  this.medico = medicoCargado;
                  this.medico.hospital = medicoCargado.hospital._id;
                  this.cambiandoHospital(this.medico.hospital);
                });
  }

  guardandoMedico(f: NgForm) {
    // console.log(f.valid);
    // console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico)
                .subscribe(medicoAGuardar => {
                  // console.log(medicoAGuardar);
                  this.medico._id = medicoAGuardar._id;
                  this.router.navigate(['/medico', this.medico._id]);
                });
  }

  cambiandoHospital(id: string) {
    // console.log(event);
    this._hospitalService.obtenerHospital(id)
                .subscribe(hospitalDeCambio => {
                  // console.log(hospitalDeCambio);
                  this.hospital = hospitalDeCambio;
                });
  }

  cambiandoFotoMedico() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
