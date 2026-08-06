import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SedeJudicial } from '../../models/sedeJudicial.model';
import { TipoDependencia } from '../../models/tipoDependencia.model';
import { NivelJurisdiccional } from '../../models/nivelJurisdiccional.model';
import { Especialidad } from '../../models/especialidad.model';
import { UnidadAdministrativa } from '../../models/unidadAdministrativa.model';
import { Coordinacion } from '../../models/coordinacion.model';
import { SedeJudicialService } from '../../services/sedeJudicial.service';
import { TipoDependenciaService } from '../../services/tipoDependencia.service';
import { NivelJurisdiccionalService } from '../../services/nivelJurisdiccional.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { UnidadAdministrativaService } from '../../services/unidadAdministrativa.service';
import { CoordinacionService } from '../../services/coordinacion.service';

@Component({
  selector: 'app-filtros-anexos',
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros-anexos.html',
  styleUrl: './filtros-anexos.css',
})
export class FiltrosAnexos implements OnInit{

  
  sedes: SedeJudicial[] = [];
  tipos: TipoDependencia[] = [];
  niveles: NivelJurisdiccional[] = [];
  especialidades: Especialidad[] = [];
  unidades: UnidadAdministrativa[] = [];
  coordinaciones: Coordinacion[] = [];


  tipoSeleccionado?: number;
  esJurisdiccional = false;
  esAdministrativa = false;
  nivelSeleccionado?: number;
  unidadSeleccionada?: number;
  sedeSeleccionada?: number;
  especialidadSeleccionada?: number;
  coordinacionSeleccionada?: number;
  nombreBusqueda: string = '';

  @Output() filtrar = new
  EventEmitter<any>();


  constructor(
    private sedeService: SedeJudicialService,
    private tipoService: TipoDependenciaService,
    private nivelService: NivelJurisdiccionalService,
    private especialidadService: EspecialidadService,
    private unidadService: UnidadAdministrativaService,
    private coordinacionService: CoordinacionService
  ) {}


  ngOnInit(): void {
    this.cargarSedes();
    this.cargarTipos();
    this.cargarNiveles();
    this.cargarUnidades();
  }

  cargarSedes(){
    this.sedeService.listar()
    .subscribe(data => {
      this.sedes = data;
    });
  }

  cargarTipos(){
    this.tipoService.listar()
    .subscribe(data => {
      this.tipos = data;
    });
  }

  cargarNiveles(){
    this.nivelService.listar()
    .subscribe(data => {
      this.niveles = data;
    });
  }

  cargarUnidades(){
    this.unidadService.listar()
    .subscribe(data => {
      this.unidades = data;
    });
  }

  cargarEspecialidades(){
    if(this.nivelSeleccionado){
      this.especialidadService
      .listarPorNivel(this.nivelSeleccionado)
      .subscribe(data => {
        this.especialidades = data;
      });
    }
  }

  cargarCoordinaciones(){
    if(this.unidadSeleccionada){
      this.coordinacionService
      .listarPorUnidadAdministrativa(this.unidadSeleccionada)
      .subscribe(data => {
        this.coordinaciones = data;
      });
    }
  }

  cambioNivel() {
    this.especialidadSeleccionada = undefined;
    this.cargarEspecialidades();
    this.emitirFiltros();
  }

  cambioUnidad() {
    this.coordinacionSeleccionada = undefined;
    this.cargarCoordinaciones();
    this.emitirFiltros();
  }

  cambioTipo() {
    const tipo = this.tipos.find(
      t => t.id == this.tipoSeleccionado
    );

    // Limpiar filtros dependientes
    this.nivelSeleccionado = undefined;
    this.especialidadSeleccionada = undefined;
    this.unidadSeleccionada = undefined;
    this.coordinacionSeleccionada = undefined;

    this.especialidades = [];
    this.coordinaciones = [];

    if (tipo?.nombre === 'Jurisdiccional') {
      this.esJurisdiccional = true;
      this.esAdministrativa = false;
    } else if (tipo?.nombre === 'Administrativa') {
      this.esJurisdiccional = false;
      this.esAdministrativa = true;
    } else {
      this.esJurisdiccional = false;
      this.esAdministrativa = false;
    }

    this.emitirFiltros();
  }

  emitirFiltros() {
    this.filtrar.emit({
      sedeId: this.sedeSeleccionada || null,
      tipoDependenciaId: this.tipoSeleccionado || null,
      nivelJurisdiccionalId: this.nivelSeleccionado || null,
      especialidadId: this.especialidadSeleccionada || null,
      unidadAdministrativaId: this.unidadSeleccionada || null,
      coordinacionId: this.coordinacionSeleccionada || null,
      nombre: this.nombreBusqueda.trim()
    });
  }

  limpiarFiltros(){
    this.sedeSeleccionada = undefined;
    this.tipoSeleccionado = undefined;
    this.nivelSeleccionado = undefined;
    this.especialidadSeleccionada = undefined;
    this.unidadSeleccionada = undefined;
    this.coordinacionSeleccionada = undefined;
    this.especialidades = [];
    this.coordinaciones = [];
    this.esJurisdiccional = false;
    this.esAdministrativa = false;
    this.nombreBusqueda = '';
    this.emitirFiltros();
  }
}
