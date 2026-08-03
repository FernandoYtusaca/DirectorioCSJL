import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Anexo } from '../../../../models/anexo.model';

@Component({
  selector: 'app-modal-editar-anexo',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-editar-anexo.html',
  styleUrl: './modal-editar-anexo.css',
})
export class ModalEditarAnexo {

  @Input() anexo!: Anexo;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Anexo>();

  guardarCambios(){
    this.guardar.emit(this.anexo);
  }

  cerrarModal(){
    this.cerrar.emit();
  }
}
