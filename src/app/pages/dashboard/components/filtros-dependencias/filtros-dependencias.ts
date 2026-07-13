import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltrosDependencia } from '../../../../core/models/dependencia.model';

/**
 * Componente de presentación: solo captura los criterios de búsqueda
 * y emite el objeto de filtros cuando el usuario pulsa "Aplicar Filtros".
 * No conoce el listado de dependencias ni cómo se filtra.
 */
@Component({
  selector: 'app-filtros-dependencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros-dependencias.html',
  styleUrl: './filtros-dependencias.css'
})
export class FiltrosDependenciasComponent {

  @Output() aplicar = new EventEmitter<FiltrosDependencia>();

  filtroSede: string = '';
  filtroTipo: string = '';
  filtroNombre: string = '';
  filtroNivel: string = '';
  filtroEspecialidad: string = '';

  aplicarFiltros(): void {
    this.aplicar.emit({
      sede: this.filtroSede,
      tipo: this.filtroTipo,
      nombre: this.filtroNombre,
      nivel: this.filtroNivel,
      especialidad: this.filtroEspecialidad
    });
  }
}
