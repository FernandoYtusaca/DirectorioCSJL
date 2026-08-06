import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dependencia } from '../../models/dependencia.model';
import { SedeJudicial } from '../../models/sedeJudicial.model';
import { TipoDependencia } from '../../models/tipoDependencia.model';
import { NivelJurisdiccional } from '../../models/nivelJurisdiccional.model';
import { Especialidad } from '../../models/especialidad.model';
import { UnidadAdministrativa } from '../../models/unidadAdministrativa.model';
import { Coordinacion } from '../../models/coordinacion.model';
import { SedeJudicialService } from '../../services/sedeJudicial.service';
import { TipoDependenciaService } from '../../services/tipoDependencia.service';
import { UnidadAdministrativaService } from '../../services/unidadAdministrativa.service';
import { NivelJurisdiccionalService } from '../../services/nivelJurisdiccional.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { CoordinacionService } from '../../services/coordinacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-dependencia',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-dependencia.html',
  styleUrl: './formulario-dependencia.css',
})

export class FormularioDependencia implements OnInit {

  @Input() dependencia!: Dependencia;
  @Output() guardar = new EventEmitter<Dependencia>();
  @Output() cancelar = new EventEmitter<void>();

  sedes: SedeJudicial[] = [];
  tipos: TipoDependencia[] = [];
  niveles: NivelJurisdiccional[] = [];
  especialidades: Especialidad[] = [];
  unidades: UnidadAdministrativa[] = [];
  coordinaciones: Coordinacion[] = [];

  esJurisdiccional = false;
  esAdministrativa = false;

  constructor(
    private sedeService: SedeJudicialService,
    private tipoService: TipoDependenciaService,
    private nivelService: NivelJurisdiccionalService,
    private especialidadService: EspecialidadService,
    private unidadService: UnidadAdministrativaService,
    private coordinacionService: CoordinacionService
  ){}

  ngOnInit(): void {
    this.cargarSedes();
    this.cargarTipos();
    this.cargarNiveles();
    this.cargarUnidades();
    this.validarTipo();
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

  validarTipo(){
    if(!this.dependencia){
      return;
    }
    if(this.dependencia.tipoDependenciaNombre === 'Jurisdiccional'){
      this.esJurisdiccional = true;
      this.esAdministrativa = false;
      this.cargarEspecialidades();
    }else if(this.dependencia.tipoDependenciaNombre === 'Administrativa'){
      this.esAdministrativa = true;
      this.esJurisdiccional = false;
      this.cargarCoordinaciones();
    }
  }

  cargarEspecialidades(){
    if(this.dependencia.nivelJurisdiccionalId){
      this.especialidadService
      .listarPorNivel(this.dependencia.nivelJurisdiccionalId)
      .subscribe(data => {
        this.especialidades = data;
      });
    }
  }

  cargarCoordinaciones(){
    if(this.dependencia.unidadAdministrativaId){
      this.coordinacionService
      .listarPorUnidadAdministrativa(this.dependencia.unidadAdministrativaId)
      .subscribe(data => {
        this.coordinaciones = data;
      });
    }
  }

  cambioTipo(){
    const tipo = this.tipos.find(
      t => t.id == this.dependencia.tipoDependenciaId
    );

    //limpiar listas
    this.especialidades = [];
    this.coordinaciones = [];

    if(tipo?.nombre === 'Jurisdiccional'){
      this.esJurisdiccional = true;
      this.esAdministrativa = false;
      this.dependencia.coordinacionId = undefined;
      this.dependencia.unidadAdministrativaId = undefined;
    }
    else if(tipo?.nombre === 'Administrativa'){
      this.esAdministrativa = true;
      this.esJurisdiccional = false;
      this.dependencia.especialidadId = undefined;
      this.dependencia.nivelJurisdiccionalId = undefined;
    }
    else{
      this.esJurisdiccional = false;
      this.esAdministrativa = false;
    }
  
  }

  cambioNivel(){
    this.dependencia.especialidadId = undefined;
    this.cargarEspecialidades();
  }

  cambioUnidad(){
    this.dependencia.coordinacionId = undefined;
    this.cargarCoordinaciones();
  }

  guardarCambios(){

    if(!this.dependencia.nombre || this.dependencia.nombre.trim() === ''){
      Swal.fire({
        icon: 'warning',
        title: 'Campo obligatorio',
        text: 'El nombre de la dependencia es obligatorio.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if(!this.dependencia.piso || this.dependencia.piso.trim() === ''){
      Swal.fire({
        icon: 'warning',
        title: 'Campo obligatorio',
        text: 'El piso es obligatorio.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if(!this.dependencia.sedeJudicialId){
      Swal.fire({
        icon: 'warning',
        title: 'Campo obligatorio',
        text: 'Debe seleccionar una sede judicial.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if(!this.dependencia.tipoDependenciaId){
      Swal.fire({
        icon: 'warning',
        title: 'Campo obligatorio',
        text: 'Debe seleccionar el tipo de dependencia.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if(this.esJurisdiccional){
      if(!this.dependencia.nivelJurisdiccionalId){
        Swal.fire({
          icon: 'warning',
          title: 'Campo obligatorio',
          text: 'Debe seleccionar el nivel jurisdiccional.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
      if(!this.dependencia.especialidadId){
        Swal.fire({
          icon: 'warning',
          title: 'Campo obligatorio',
          text: 'Debe seleccionar una especialidad.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    if(this.esAdministrativa){
      if(!this.dependencia.unidadAdministrativaId){
        Swal.fire({
          icon: 'warning',
          title: 'Campo obligatorio',
          text: 'Debe seleccionar una unidad administrativa.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
      if(!this.dependencia.coordinacionId){
        Swal.fire({
          icon: 'warning',
          title: 'Campo obligatorio',
          text: 'Debe seleccionar una coordinación.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    this.guardar.emit(this.dependencia);

  }

  cancelarEdicion(){
    this.cancelar.emit();
  }

}

