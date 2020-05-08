import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = true;

  constructor(public _medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargandoMedicos();
  }

  cargandoMedicos() {
    this._medicoService.cargarMedicos()
                .subscribe(medicos => this.medicos = medicos);
  }

  buscandoMedico(termino: string) {
    // console.log(termino);
    if (termino.length <= 0) {
      this.cargandoMedicos();
      return;
    }
    this.cargando = true;
    this._medicoService.buscarMedicos(termino)
              .subscribe((medicosBuscados: Medico[]) => {
                // console.log(medicosBuscados);
                this.medicos = medicosBuscados;
                this.cargando = false;
              });
  }

  borrandoMedico(medico: Medico) {
    // console.log(medico);
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
              this._medicoService.borrarMedico(medico._id)
                            .subscribe(medicoABorrar => {
                              // console.log(medicoABorrar);
                              this.cargandoMedicos();
                            });
          }
    });
  }

}
