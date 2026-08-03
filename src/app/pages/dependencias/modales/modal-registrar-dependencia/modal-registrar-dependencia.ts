import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormularioDependencia } from '../../../../shared/formulario-dependencia/formulario-dependencia';
import { Dependencia } from '../../../../models/dependencia.model';

@Component({
  selector: 'app-modal-registrar-dependencia',
  imports: [CommonModule, FormularioDependencia],
  templateUrl: './modal-registrar-dependencia.html',
  styleUrl: './modal-registrar-dependencia.css',
})
export class ModalRegistrarDependencia {

  @Input() dependencia!: Dependencia;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Dependencia>();

  nuevaDependencia: Dependencia = {} as Dependencia;

  cerrarModal(){
    this.cerrar.emit();
  }

  guardarDependencia(dep: Dependencia){
    this.guardar.emit(dep);
  }


}
