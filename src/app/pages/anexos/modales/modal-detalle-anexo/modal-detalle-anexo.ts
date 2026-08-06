import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Anexo } from '../../../../models/anexo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-detalle-anexo',
  imports: [CommonModule],
  templateUrl: './modal-detalle-anexo.html',
  styleUrl: './modal-detalle-anexo.css',
})
export class ModalDetalleAnexo {

  @Input() anexo!: Anexo;
  @Output() cerrar = new EventEmitter<void>();
  cerrarModal(){

    this.cerrar.emit();

  }

}
