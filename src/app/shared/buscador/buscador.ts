import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css'
})
export class BuscadorComponent {

  @Input()
  placeholder: string = 'Buscar...';

  @Input()
  valor: string = '';

  @Output()
  buscar = new EventEmitter<string>();


  onBuscar(): void {

    this.buscar.emit(this.valor);

  }


  limpiar(): void {

    this.valor = '';

    this.buscar.emit('');

  }

}