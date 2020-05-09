import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenASubir: File;
  imagenTemporal: string | ArrayBuffer;

  constructor(public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) {
    // console.log('Modal upload del componente listo');
   }

  ngOnInit(): void {
  }

  cerrandoModal() {
    this.imagenASubir = null;
    this.imagenTemporal = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionandoImagen(archivo: File) {
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

  subiendoImagen() {
    this._subirArchivoService.subirArchivo(this.imagenASubir, this._modalUploadService.tipo, this._modalUploadService.id)
                .then((resp: any) => {
                  // console.log(resp);
                  this._modalUploadService.notificacion.emit(resp);
                  this.cerrandoModal();
                })
                .catch(err => {
                  console.log('Error al cargar la imagen');
                });
  }

}
