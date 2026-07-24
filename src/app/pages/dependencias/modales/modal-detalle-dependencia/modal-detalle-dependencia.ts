import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dependencia } from '../../../../models/dependencia.model';

@Component({
  selector: 'app-modal-detalle-dependencia',
  imports: [CommonModule],
  templateUrl: './modal-detalle-dependencia.html',
  styleUrl: './modal-detalle-dependencia.css',
})
export class ModalDetalleDependencia {
  @Input() dependencia!: Dependencia;

  @Output() cerrar = new
  EventEmitter<void>();

  cerrarModal(){
    this.cerrar.emit();
  }
}
