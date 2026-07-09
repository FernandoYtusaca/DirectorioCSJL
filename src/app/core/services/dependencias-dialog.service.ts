import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Dependencia, DependenciaFormData } from '../models/dependencia.model';

/**
 * Encapsula toda la interacción con SweetAlert2.
 * Así el componente del dashboard no conoce ids de inputs del DOM
 * ni la librería de alertas: solo pide "muéstrame el detalle",
 * "pídeme los datos de edición", etc., y recibe una Promise.
 */
@Injectable({ providedIn: 'root' })
export class DependenciasDialogService {

  /** Muestra el detalle de solo lectura de una dependencia. */
  mostrarDetalle(dep: Dependencia): void {
    Swal.fire({
      title: `<strong>Detalle: ${dep.nombre}</strong>`,
      icon: 'info',
      html: `
        <div style="text-align: left; line-height: 2;">
          <p><strong>Nivel/Clase:</strong> ${dep.nivel}</p>
          <p><strong>Sede Asignada:</strong> ${dep.sede}</p>
          <p><strong>Tipo de Dependencia:</strong> ${dep.tipo}</p>
          <p><strong>Especialidad:</strong> ${dep.especialidad}</p>
          <p><strong>Anexos Telefónicos:</strong> 📞 ${dep.anexos}</p>
        </div>
      `,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#0b46be'
    });
  }

  /** Abre el formulario de edición precargado. Resuelve con los datos o null si se cancela. */
  async pedirEdicion(dep: Dependencia): Promise<DependenciaFormData | null> {
    const result = await Swal.fire({
      title: 'Editar Dependencia',
      html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${dep.nombre}">
        <input id="swal-nivel" class="swal2-input" placeholder="Nivel" value="${dep.nivel}">
        <input id="swal-sede" class="swal2-input" placeholder="Sede" value="${dep.sede}">
        <select id="swal-tipo" class="swal2-input">
          <option value="Jurisdiccional" ${dep.tipo === 'Jurisdiccional' ? 'selected' : ''}>Jurisdiccional</option>
          <option value="Administrativa" ${dep.tipo === 'Administrativa' ? 'selected' : ''}>Administrativa</option>
        </select>
        <input id="swal-especialidad" class="swal2-input" placeholder="Especialidad" value="${dep.especialidad}">
        <input id="swal-anexos" type="number" class="swal2-input" placeholder="Anexos" value="${dep.anexos}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar Cambios',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0b46be',
      preConfirm: () => ({
        nombre: (document.getElementById('swal-nombre') as HTMLInputElement).value,
        nivel: (document.getElementById('swal-nivel') as HTMLInputElement).value,
        sede: (document.getElementById('swal-sede') as HTMLInputElement).value,
        tipo: (document.getElementById('swal-tipo') as HTMLSelectElement).value,
        especialidad: (document.getElementById('swal-especialidad') as HTMLInputElement).value,
        anexos: parseInt((document.getElementById('swal-anexos') as HTMLInputElement).value) || 0
      })
    });

    return result.isConfirmed ? (result.value as DependenciaFormData) : null;
  }

  /** Abre el formulario de creación vacío. Resuelve con los datos o null si se cancela / falta el nombre. */
  async pedirCreacion(): Promise<DependenciaFormData | null> {
    const result = await Swal.fire({
      title: 'Registrar Nueva Dependencia',
      html: `
        <input id="new-nombre" class="swal2-input" placeholder="Nombre de Dependencia">
        <input id="new-nivel" class="swal2-input" placeholder="Nivel (Ej. Juzgado Civil)">
        <input id="new-sede" class="swal2-input" placeholder="Sede">
        <select id="new-tipo" class="swal2-input">
          <option value="Jurisdiccional">Jurisdiccional</option>
          <option value="Administrativa">Administrativa</option>
        </select>
        <input id="new-especialidad" class="swal2-input" placeholder="Especialidad">
        <input id="new-anexos" type="number" class="swal2-input" placeholder="Número de Anexos">
      `,
      confirmButtonText: 'Registrar',
      confirmButtonColor: '#0b46be',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => ({
        nombre: (document.getElementById('new-nombre') as HTMLInputElement).value,
        nivel: (document.getElementById('new-nivel') as HTMLInputElement).value,
        sede: (document.getElementById('new-sede') as HTMLInputElement).value,
        tipo: (document.getElementById('new-tipo') as HTMLSelectElement).value,
        especialidad: (document.getElementById('new-especialidad') as HTMLInputElement).value,
        anexos: parseInt((document.getElementById('new-anexos') as HTMLInputElement).value) || 0
      })
    });

    if (!result.isConfirmed || !result.value?.nombre) return null;
    return result.value as DependenciaFormData;
  }

  /** Pide confirmación antes de eliminar. Resuelve true si el usuario confirma. */
  async confirmarEliminacion(): Promise<boolean> {
    const result = await Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      text: 'Esta acción borrará la dependencia del directorio permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
  }

  notificarExito(titulo: string, mensaje: string): void {
    Swal.fire(titulo, mensaje, 'success');
  }
}
