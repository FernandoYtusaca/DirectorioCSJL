import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Anexo } from '../../../../models/anexo.model';
import { FormularioAnexo } from '../../../../shared/formulario-anexo/formulario-anexo';

@Component({
  selector: 'app-modal-registrar-anexo',
  imports: [CommonModule, FormsModule,FormularioAnexo],
  templateUrl: './modal-registrar-anexo.html',
  styleUrl: './modal-registrar-anexo.css',
})
export class ModalRegistrarAnexo {

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Anexo>();

  nuevoAnexo: Anexo = {
    id: 0,
    numero: '',
    dependenciaId: 0,
    dependenciaNombre: '',
    activo: 'S',
    fechaCreacion: ''
  };

  constructor(){}

  guardarAnexo(anexo: Anexo){
    this.guardar.emit(anexo);
  }

  cerrarModal(){
    this.cerrar.emit();
  }

}
