import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dependencia } from '../../../../models/dependencia.model';
import { FormularioDependencia } from '../../../../shared/formulario-dependencia/formulario-dependencia';

@Component({
  selector: 'app-modadl-editar-dependencia',
  imports: [CommonModule, FormularioDependencia],
  templateUrl: './modal-editar-dependencia.html',
  styleUrl: './modal-editar-dependencia.css',
})
export class ModadlEditarDependencia {
  
  @Input() dependencia!: Dependencia;

  @Output() cerrar = new EventEmitter<void>();

  @Output() guardar = new EventEmitter<Dependencia>();

  cerrarModal(){
    this.cerrar.emit();
  }

  guardarCambios(dependencia: Dependencia){
    this.guardar.emit(dependencia);
  }

}
