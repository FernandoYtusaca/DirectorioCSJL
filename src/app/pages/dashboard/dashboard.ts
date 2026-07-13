import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar';
import { HeaderComponent } from '../../shared/header/header';
import { FiltrosDependenciasComponent } from './components/filtros-dependencias/filtros-dependencias';
import { TablaDependenciasComponent } from './components/tabla-dependencias/tabla-dependencias';
import { MetricasDependenciasComponent } from './components/metricas-dependencias/metricas-dependencias';
import { DependenciasService } from '../../core/services/dependencias.service';
import { DependenciasDialogService } from '../../core/services/dependencias-dialog.service';
import { Dependencia, FiltrosDependencia, MetricasDependencia } from '../../core/models/dependencia.model';

/**
 * Componente "inteligente" (smart component) del dashboard.
 * Su única responsabilidad es orquestar: pide datos al servicio,
 * delega los diálogos al servicio de diálogos, y reparte el estado
 * resultante entre los componentes de presentación (filtros, tabla, métricas).
 * No conoce SweetAlert2 ni la forma en que se filtran o calculan los datos.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FiltrosDependenciasComponent,
    TablaDependenciasComponent,
    MetricasDependenciasComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  dependenciasFiltradas: Dependencia[] = [];
  metricas: MetricasDependencia = { totalJuzgados: 0, totalUnidades: 0, totalAnexos: 0 };

  private filtrosActuales: FiltrosDependencia = {
    sede: '', tipo: '', nombre: '', nivel: '', especialidad: ''
  };

  constructor(
    private readonly dependenciasService: DependenciasService,
    private readonly dialogService: DependenciasDialogService
  ) {}

  ngOnInit(): void {
    this.refrescarListado();
    this.refrescarMetricas();
  }

  // Llamado por app-filtros-dependencias al pulsar "Aplicar Filtros"
  onAplicarFiltros(filtros: FiltrosDependencia): void {
    this.filtrosActuales = filtros;
    this.refrescarListado();
  }

  // Llamado por app-tabla-dependencias (ícono ojo)
  onVer(dep: Dependencia): void {
    this.dialogService.mostrarDetalle(dep);
  }

  // Llamado por app-tabla-dependencias (ícono lápiz)
  async onEditar(dep: Dependencia): Promise<void> {
    const datos = await this.dialogService.pedirEdicion(dep);
    if (!datos) return;

    this.dependenciasService.actualizar(dep.id, datos);
    this.refrescarListado();
    this.refrescarMetricas();
    this.dialogService.notificarExito('¡Actualizado!', 'La dependencia fue modificada con éxito.');
  }

  // Llamado por app-tabla-dependencias (ícono tacho)
  async onEliminar(id: number): Promise<void> {
    const confirmado = await this.dialogService.confirmarEliminacion();
    if (!confirmado) return;

    this.dependenciasService.eliminar(id);
    this.refrescarListado();
    this.refrescarMetricas();
    this.dialogService.notificarExito('¡Eliminado!', 'El registro ha sido removido.');
  }

  // Botón "+ Registrar Nueva Dependencia"
  async abrirModalCrear(): Promise<void> {
    const datos = await this.dialogService.pedirCreacion();
    if (!datos) return;

    this.dependenciasService.crear(datos);
    this.refrescarListado();
    this.refrescarMetricas();
    this.dialogService.notificarExito('¡Creado!', 'Nueva dependencia agregada con éxito.');
  }

  private refrescarListado(): void {
    this.dependenciasFiltradas = this.dependenciasService.filtrar(this.filtrosActuales);
  }

  private refrescarMetricas(): void {
    this.metricas = this.dependenciasService.calcularMetricas();
  }
}
