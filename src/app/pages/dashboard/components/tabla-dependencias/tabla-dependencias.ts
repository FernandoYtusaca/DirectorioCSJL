import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dependencia } from '../../../../core/models/dependencia.model';

/**
 * Componente de presentación: solo pinta el listado recibido
 * y delega al padre las acciones de ver/editar/eliminar.
 */
@Component({
  selector: 'app-tabla-dependencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-dependencias.html',
  styleUrl: './tabla-dependencias.css'
})
export class TablaDependenciasComponent {

  @Input() dependencias: Dependencia[] = [];

  @Output() ver = new EventEmitter<Dependencia>();
  @Output() editar = new EventEmitter<Dependencia>();
  @Output() eliminar = new EventEmitter<number>();
}
