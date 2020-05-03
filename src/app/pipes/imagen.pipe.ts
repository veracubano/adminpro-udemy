import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    // return 'FUNCIONA!!';
    let url = URL_SERVICIOS + '/img';
    if (!img) { // si el usuario no tiene "img", o sea, si no existe "img"
      return url + '/usuarios/xxx';
    }
    if (img.indexOf('https') >= 0) { // significa que trae una imagen de Google, y en este caso la reorna tal cual
      return img;
    }
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'medico':
        url += '/medicos/' + img;
        break;

      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('Tipo de imagen no existe, solo pueden ser usuarios, médicos u hospitales');
        url += 'usuarios/xxx';
    }
    return url;
  }

}
