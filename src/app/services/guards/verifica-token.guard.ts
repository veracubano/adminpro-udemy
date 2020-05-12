import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
              public router: Router) {}

  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('Pasó por el verifica token guard');
    let token = this._usuarioService.token;
    let propiedadesDelToken = JSON.parse(atob(token.split('.')[1])); // el método "atob()" decodifica una cadena de datos que ha sido codificada utilizando la codificación en base-64. El método "split('.')" los separa con el separador "." y especifico que quiero el elemento con índice [1] y lo almaceno en la variable "payload"
    // console.log(propiedadesDelToken); // El objeto "propiedadesDelToken" contiene la fecha de creación del token (iat), y la fecha de expiración del token (exp), entre otras propiedades
    // console.log('Tiempo de expiración del token: ' + propiedadesDelToken.exp + ' segundos.');
    let tiempoExpiracionDelToken = propiedadesDelToken.exp; // es el tiempo de expiración del token contado en segundos partiendo de su fecha de expiración
    let expirado = this.expirado(tiempoExpiracionDelToken); // Se llama a la función "expirado()" que recibe como parámetro el valor de "tiempoExpiracionDelToken" en segundos, cuyo resultado se almacena en la variable booleana llamada "expirado"
    if (expirado) { // si la variable "expirado" es "true", o sea, si el token ha expirado
      this.router.navigate(['/login']); // redirecciona a la pantalla de login
      return false;
    }
    return this.renuevaFechaExpiracionDelToken(tiempoExpiracionDelToken);
  }

  renuevaFechaExpiracionDelToken(fechaExpiracion: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let fechaExpiracionDelToken = new Date(fechaExpiracion * 1000); //en la variable "fechaExpiracionDelToken" se almacena el "tiempoExpiracionDelToken" expresado en milisegundos
      let ahora = new Date(); // se crea la variable local llamada "ahora" del tipo Date() y no se le asigna valor alguno
      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000)); // a la variable "ahora" se le asigna el valor de 1 hora más de tiempo que el tiempo actual, pero convertido en milisegundos
      // console.log('Fecha de expiración del token: ' + fechaExpiracionDelToken);
      // console.log('Fecha actual más 1 hora: ' + ahora);
      if (fechaExpiracionDelToken.getTime() > ahora.getTime()) {
        resolve(true); // significa que el token tiene más de 1 hora de vigencia disponible
      } else {
        this._usuarioService.renovarToken() // de lo contrario se llama a la función "renovarToken()" declarada en el archivo "usuario.service.ts"
                      .subscribe(() => {
                        resolve(true); // tenemos un nuevo toke
                        // console.log('El token ha sido renovado');
                      }, () => {
                        this.router.navigate(['/login']);
                        reject(false);
                      });
      }
    });

  }

  expirado(fechaExpiracion: number) { // esta función devuelve un booleano, es decir, "true" si ya expiró, o "false" si no ha expirado
    let enEsteMomento = new Date().getTime() / 1000;
    if (fechaExpiracion < enEsteMomento) {
      return true;
    } else {
      return false;
    }
  }

}
