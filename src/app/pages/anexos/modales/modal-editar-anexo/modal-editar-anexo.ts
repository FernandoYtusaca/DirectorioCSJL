import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Anexo } from '../../../../models/anexo.model';
import { FormularioAnexo } from '../../../../shared/formulario-anexo/formulario-anexo';

@Component({
  selector: 'app-modal-editar-anexo',
  imports: [CommonModule, FormsModule,FormularioAnexo],
  templateUrl: './modal-editar-anexo.html',
  styleUrl: './modal-editar-anexo.css',
})
export class ModalEditarAnexo {

  @Input() anexo!: Anexo;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Anexo>();

  guardarCambios(anexo: Anexo){
    this.guardar.emit(anexo);
  }

  cerrarModal(){
    this.cerrar.emit();
  }
}
