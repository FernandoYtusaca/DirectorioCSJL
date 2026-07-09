import { Injectable } from '@angular/core';
import {
  Dependencia,
  DependenciaFormData,
  FiltrosDependencia,
  MetricasDependencia
} from '../models/dependencia.model';

/**
 * Fuente única de verdad para el listado de dependencias.
 * Concentra el estado en memoria y toda la lógica de negocio
 * (alta, baja, modificación, filtrado y cálculo de métricas),
 * dejando a los componentes libres de manipular el arreglo directamente.
 */
@Injectable({ providedIn: 'root' })
export class DependenciasService {

  private dependencias: Dependencia[] = [
    { id: 1, nombre: '11° Juzgado Especializado Civil', nivel: 'Juzgado Especializado', sede: 'Sede Alzamora Valdez', tipo: 'Jurisdiccional', especialidad: 'Civil', anexos: 3 },
    { id: 2, nombre: 'Mesa de Partes', nivel: 'Unidad de Servicios', sede: 'Sede Alzamora Valdez', tipo: 'Administrativa', especialidad: '-', anexos: 1 },
    { id: 3, nombre: '1° Juzgado de Paz Letrado', nivel: 'Juzgado de Paz', sede: 'Sede Central', tipo: 'Jurisdiccional', especialidad: 'Paz Letrado', anexos: 2 },
    { id: 4, nombre: 'Oficina de Imagen Institucional', nivel: 'Unidad de Gestión', sede: 'Sede Central', tipo: 'Administrativa', especialidad: '-', anexos: 4 }
  ];

  /** Devuelve una copia del listado completo, sin filtrar. */
  obtenerTodas(): Dependencia[] {
    return [...this.dependencias];
  }

  /** Agrega una nueva dependencia generando un id incremental. */
  crear(datos: DependenciaFormData): Dependencia {
    const nueva: Dependencia = { id: Date.now(), ...datos };
    this.dependencias.push(nueva);
    return nueva;
  }

  /** Actualiza una dependencia existente por id. Retorna true si la encontró. */
  actualizar(id: number, datos: DependenciaFormData): boolean {
    const index = this.dependencias.findIndex(d => d.id === id);
    if (index === -1) return false;
    this.dependencias[index] = { id, ...datos };
    return true;
  }

  /** Elimina una dependencia por id. */
  eliminar(id: number): void {
    this.dependencias = this.dependencias.filter(d => d.id !== id);
  }

  /** Aplica el cruce de filtros sobre el listado maestro. */
  filtrar(filtros: FiltrosDependencia): Dependencia[] {
    return this.dependencias.filter(dep => {
      const cumpleSede = !filtros.sede || dep.sede === filtros.sede;
      const cumpleTipo = !filtros.tipo || dep.tipo === filtros.tipo;
      const cumpleNivel = !filtros.nivel || dep.nivel === filtros.nivel;
      const cumpleEspecialidad = !filtros.especialidad || dep.especialidad === filtros.especialidad;
      const cumpleNombre = !filtros.nombre || dep.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());

      return cumpleSede && cumpleTipo && cumpleNivel && cumpleEspecialidad && cumpleNombre;
    });
  }

  /** Calcula las métricas agregadas (widgets) sobre el listado maestro. */
  calcularMetricas(): MetricasDependencia {
    return {
      totalJuzgados: this.dependencias.filter(d => d.tipo === 'Jurisdiccional').length,
      totalUnidades: this.dependencias.filter(d => d.tipo === 'Administrativa').length,
      totalAnexos: this.dependencias.reduce((sum, item) => sum + item.anexos, 0)
    };
  }
}
