import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Anexo } from '../../models/anexo.model';
import { AnexoService } from '../../services/anexo.service';
import { ModalRegistrarAnexo } from './modales/modal-registrar-anexo/modal-registrar-anexo';
import { ModalDetalleAnexo } from './modales/modal-detalle-anexo/modal-detalle-anexo';
import { ModalEditarAnexo } from './modales/modal-editar-anexo/modal-editar-anexo';
import { FiltrosAnexos } from '../../filtros/filtros-anexos/filtros-anexos';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-anexos',
  imports: [CommonModule, ModalRegistrarAnexo, ModalDetalleAnexo, ModalEditarAnexo, FiltrosAnexos],
  templateUrl: './anexos.html',
  styleUrl: './anexos.css'
})
export class Anexos implements OnInit {

  anexos: Anexo[] = [];
  anexosOriginales: Anexo[] = [];
  dependenciasAnexos: any[] = [];

  usuario: any;
  rol: string = '';

  //Modal detalle
  mostrarModal = false;
  anexoSeleccionado!: Anexo;

  //Modal editar
  mostrarModalEditar = false;
  anexoEditar!: Anexo;

  //Modal registar
  mostarModalRegistar = false;

  constructor(
    private anexoService: AnexoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.usuario = this.authService.obtenerUsuario();
    this.rol = this.usuario?.rol?.trim().toUpperCase();

    if (this.rol === 'ADMINISTRADOR') {

      this.anexoService.listarTodas()
        .subscribe(data => {
          this.anexos = data;
          this.anexosOriginales = data;
          this.agruparAnexos()
        });

    } else {

      this.anexoService.listarActivos()
        .subscribe(data => {
          this.anexos = data;
          this.anexosOriginales = data;
          this.agruparAnexos();
        });

    }

  }

  abrirModal(anexo: Anexo){
    this.anexoSeleccionado = anexo;
    this.mostrarModal = true;
  }

  cerrarModal(){
    this.mostrarModal = false;
  }

  abrirEditar(anexo: Anexo){
    this.anexoEditar = {...anexo};
    this.mostrarModalEditar = true;
  }

  cerrarEditar(){
    this.mostrarModalEditar = false;
  }

  abrirRegistrar(){
    this.mostarModalRegistar = true;
  }

  cerrarRegistrar(){
    this.mostarModalRegistar = false;
  }

  guardarAnexo(anexo: Anexo){
    this.anexoService
      .guardar(anexo)
      .subscribe(data => {

        this.anexos = [...this.anexos, data];
        this.anexosOriginales = [...this.anexosOriginales, data];

        this.agruparAnexos();
        this.cerrarRegistrar();
      });
  }

  guardarEdicion(anexo: Anexo){
    
    this.anexoService
      .actualizar(anexo.id, anexo)
      .subscribe(data => {

        const index = this.anexos.findIndex(a => a.id === data.id);

        if(index !== -1){
          this.anexos[index] = data;
        }

        const indexOriginal = this.anexosOriginales.findIndex(a => a.id === data.id);

        if(indexOriginal !== -1){
          this.anexosOriginales[indexOriginal] = data;
        }

        this.agruparAnexos();
        this.cerrarEditar();
      })

  }

  cambiarEstado(anexo: Anexo){
    this.anexoService
      .cambiarEstado(anexo.id)
      .subscribe(data => {
        anexo.activo = data.activo;
      })
  }

  agruparAnexos(){
    const grupos = new Map();

    this.anexos.forEach(anexo =>{
      const nombre = anexo.dependenciaNombre;
      if(!grupos.has(nombre)){
        grupos.set(nombre, {
          dependenciaNombre: nombre, anexos: []
        });
      }

      grupos.get(nombre).anexos.push(anexo);
    });

    this.dependenciasAnexos = Array.from(grupos.values());
  }

  recibirFiltros(filtros:any){
    this.anexos = this.anexosOriginales.filter(anexo => {

      let coincide = true;

      if(filtros.sedeId){
        coincide = coincide &&
        anexo.sedeJudicialId == filtros.sedeId;
      }

      if(filtros.tipoDependenciaId){
        coincide = coincide &&
        anexo.tipoDependenciaId == filtros.tipoDependenciaId;
      }

      if(filtros.nivelJurisdiccionalId){
        coincide = coincide &&
        anexo.nivelJurisdiccionalId == filtros.nivelJurisdiccionalId;
      }

      if(filtros.especialidadId){
        coincide = coincide &&
        anexo.especialidadId == filtros.especialidadId;
      }

      if(filtros.unidadAdministrativaId){
        coincide = coincide &&
        anexo.unidadAdministrativaId == filtros.unidadAdministrativaId;
      }

      if(filtros.coordinacionId){
        coincide = coincide &&
        anexo.coordinacionId == filtros.coordinacionId;
      }

      if(filtros.nombre){
        coincide = coincide &&
        (anexo.dependenciaNombre ?? '')
        .toLowerCase()
        .includes(
          filtros.nombre.toLowerCase()
        );
      }

      return coincide;
    });

    this.agruparAnexos();
  }

}