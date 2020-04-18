import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = ''; // dentro del incrementador (o sea en el hijo) la variable se llamará "nombre", y afuera se llamará "leyenda"
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter(); // desde el hijo (o sea desde el IncrementadorComponent) se envía al padre (o sea al ProgressComponent) el valor (que en este caso es de tipo "number") resultante del evento "cambioValor"

  constructor() {
    // console.log('Leyenda:', this.leyenda);
    // console.log('Progreso:', this.progreso);
   }

  ngOnInit(): void {
    // console.log('Leyenda:', this.leyenda);
    // console.log('Progreso:', this.progreso);
  }

  onChanges(newValue: number) {
    // console.log('newValue: ', newValue);
    // let elemHtml: any = document.getElementsByName('progreso')[0]; // como devuelve un arreglo aunque haya un solo elemento necesito ponerle el índice [0] para que me devuelva el único que hay
    // console.log(elemHtml.value);
    // console.log(this.txtProgress);
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHtml.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

  cambiarValor(valor: number) {
    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValor.emit( this.progreso ); // aquí se usa el evento "cambioValor" que es quien enviará un valor hasta el padre (o sea, hasta el ProgressComponent)
    focus();
  }

}
