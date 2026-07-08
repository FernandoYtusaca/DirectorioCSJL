import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- CRUCIAL para usar [(ngModel)]
import { SidebarComponent } from '../../shared/sidebar/sidebar';
import { HeaderComponent } from '../../shared/header/header';
import Swal from 'sweetalert2';

// Definición de estructura limpia de datos
interface Dependencia {
  id: number;
  nombre: string;
  nivel: string;
  sede: string;
  tipo: 'Jurisdiccional' | 'Administrativa';
  especialidad: string;
  anexos: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  
  // Variables capturadoras de Filtros
  filtroSede: string = '';
  filtroTipo: string = '';
  filtroNombre: string = '';
  filtroNivel: string = '';
  filtroEspecialidad: string = '';

  // Contenedores de Estado
  dependencias: Dependencia[] = [];
  dependenciasFiltradas: Dependencia[] = [];

  // Contadores dinámicos para los Widgets
  totalJuzgados: number = 0;
  totalUnidades: number = 0;
  totalAnexos: number = 0;

  ngOnInit() {
    // Inicialización exacta de tu diseño base
    this.dependencias = [
      { id: 1, nombre: '11° Juzgado Especializado Civil', nivel: 'Juzgado Especializado', sede: 'Sede Alzamora Valdez', tipo: 'Jurisdiccional', especialidad: 'Civil', anexos: 3 },
      { id: 2, nombre: 'Mesa de Partes', nivel: 'Unidad de Servicios', sede: 'Sede Alzamora Valdez', tipo: 'Administrativa', especialidad: '-', anexos: 1 },
      { id: 3, nombre: '1° Juzgado de Paz Letrado', nivel: 'Juzgado de Paz', sede: 'Sede Central', tipo: 'Jurisdiccional', especialidad: 'Paz Letrado', anexos: 2 },
      { id: 4, nombre: 'Oficina de Imagen Institucional', nivel: 'Unidad de Gestión', sede: 'Sede Central', tipo: 'Administrativa', especialidad: '-', anexos: 4 }
    ];
    this.dependenciasFiltradas = [...this.dependencias];
    this.recalcularMetricas();
  }

  recalcularMetricas() {
    this.totalJuzgados = this.dependencias.filter(d => d.tipo === 'Jurisdiccional').length;
    this.totalUnidades = this.dependencias.filter(d => d.tipo === 'Administrativa').length;
    this.totalAnexos = this.dependencias.reduce((sum, item) => sum + item.anexos, 0);
  }

  // ACCIÓN: Aplicar Filtros (Cruza todas las variables simultáneamente)
  aplicarFiltros() {
    this.dependenciasFiltradas = this.dependencias.filter(dep => {
      const cumpleSede = !this.filtroSede || dep.sede === this.filtroSede;
      const cumpleTipo = !this.filtroTipo || dep.tipo === this.filtroTipo;
      const cumpleNivel = !this.filtroNivel || dep.nivel === this.filtroNivel;
      const cumpleEspecialidad = !this.filtroEspecialidad || dep.especialidad === this.filtroEspecialidad;
      const cumpleNombre = !this.filtroNombre || dep.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      
      return cumpleSede && cumpleTipo && cumpleNivel && cumpleEspecialidad && cumpleNombre;
    });
  }

  // ACCIÓN 1: Visualizar (Ojo)
  visualizarDependencia(dep: Dependencia) {
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

  // ACCIÓN 2: Editar (Lápiz) con Formulario Emergente integrado
  editarDependencia(dep: Dependencia) {
    Swal.fire({
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
      preConfirm: () => {
        return {
          nombre: (document.getElementById('swal-nombre') as HTMLInputElement).value,
          nivel: (document.getElementById('swal-nivel') as HTMLInputElement).value,
          sede: (document.getElementById('swal-sede') as HTMLInputElement).value,
          tipo: (document.getElementById('swal-tipo') as HTMLSelectElement).value,
          especialidad: (document.getElementById('swal-especialidad') as HTMLInputElement).value,
          anexos: parseInt((document.getElementById('swal-anexos') as HTMLInputElement).value) || 0
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Encontramos el registro en el arreglo y lo actualizamos en caliente
        const index = this.dependencias.findIndex(d => d.id === dep.id);
        if (index !== -1) {
          this.dependencias[index] = { id: dep.id, ...result.value };
          this.aplicarFiltros(); // Refrescar pantalla
          this.recalcularMetricas(); // Actualizar widgets
          Swal.fire('¡Actualizado!', 'La dependencia fue modificada con éxito.', 'success');
        }
      }
    });
  }

  // ACCIÓN 3: Eliminar (Tachito) con Doble Validación
  eliminarDependencia(id: number) {
    Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      text: "Esta acción borrará la dependencia del directorio permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Borramos del arreglo maestro
        this.dependencias = this.dependencias.filter(d => d.id !== id);
        this.aplicarFiltros(); // Forzamos repintado de tabla
        this.recalcularMetricas(); // Reajustamos widgets inferiores
        
        Swal.fire('¡Eliminado!', 'El registro ha sido removido.', 'success');
      }
    });
  }

  // BONUS ACCIÓN: Botón registrar arriba a la derecha
  abrirModalCrear() {
    Swal.fire({
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
      preConfirm: () => {
        return {
          id: Date.now(), // ID incremental simulado
          nombre: (document.getElementById('new-nombre') as HTMLInputElement).value,
          nivel: (document.getElementById('new-nivel') as HTMLInputElement).value,
          sede: (document.getElementById('new-sede') as HTMLInputElement).value,
          tipo: (document.getElementById('new-tipo') as HTMLSelectElement).value,
          especialidad: (document.getElementById('new-especialidad') as HTMLInputElement).value,
          anexos: parseInt((document.getElementById('new-anexos') as HTMLInputElement).value) || 0
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value.nombre) {
        this.dependencias.push(result.value);
        this.aplicarFiltros();
        this.recalcularMetricas();
        Swal.fire('¡Creado!', 'Nueva dependencia agregada con éxito.', 'success');
      }
    });
  }
}