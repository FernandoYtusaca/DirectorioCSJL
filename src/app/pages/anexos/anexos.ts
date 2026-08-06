import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Anexo } from '../../models/anexo.model';
import { AnexoService } from '../../services/anexo.service';
import { ModalRegistrarAnexo } from './modales/modal-registrar-anexo/modal-registrar-anexo';
import { ModalDetalleAnexo } from './modales/modal-detalle-anexo/modal-detalle-anexo';
import { ModalEditarAnexo } from './modales/modal-editar-anexo/modal-editar-anexo';
import { FiltrosAnexos } from '../../filtros/filtros-anexos/filtros-anexos';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

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

  guardarAnexo(anexo: Anexo) {

    Swal.fire({
      title: '¿Desea registrar este anexo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.anexoService.guardar(anexo)
        .subscribe({
          next: () => {
            if (this.rol === 'ADMINISTRADOR') {
              this.anexoService.listarTodas()
              .subscribe(lista => {
                this.anexos = lista;
                this.anexosOriginales = lista;
                this.agruparAnexos();
              });
            } else {
              this.anexoService.listarActivos()
              .subscribe(lista => {
                this.anexos = lista;
                this.anexosOriginales = lista;
                this.agruparAnexos();
              });
            }
            this.cerrarRegistrar();
            Swal.fire({
              icon: 'success',
              title: '¡Registro exitoso!',
              text: 'El anexo fue registrado correctamente.',
              confirmButtonText: 'Aceptar'
            });
          },

          error: (error) => {
            let mensaje = 'No se pudo registrar el anexo.';
            if(error.error?.message){
              mensaje = error.error.message;
            }
            Swal.fire({
              icon: 'error',
              title: 'Error al registrar',
              text: mensaje,
              confirmButtonText: 'Aceptar'
            });
          }

        });
      }
    });
  }

  guardarEdicion(anexo: Anexo) {
    Swal.fire({
      title: '¿Desea guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.anexoService.actualizar(anexo.id, anexo)
        .subscribe({
          next: () => {
            if(this.rol === 'ADMINISTRADOR'){
              this.anexoService.listarTodas()
              .subscribe(lista => {
                this.anexos = lista;
                this.anexosOriginales = lista;
                this.agruparAnexos();
              });
            }else{
              this.anexoService.listarActivos()
              .subscribe(lista => {
                this.anexos = lista;
                this.anexosOriginales = lista;
                this.agruparAnexos();
              });
            }
            this.cerrarEditar();
            Swal.fire({
              icon:'success',
              title:'¡Actualizado!',
              text:'El anexo fue actualizado correctamente.',
              confirmButtonText:'Aceptar'
            });
          },
          error:(error)=>{
            let mensaje = 'No se pudo actualizar el anexo.';
            if(error.error?.message){
              mensaje = error.error.message;
            }
            Swal.fire({
              icon:'error',
              title:'Error al actualizar',
              text:mensaje,
              confirmButtonText:'Aceptar'
            });
          }
          
        });
      }
    });
  }

  cambiarEstado(anexo: Anexo) {
    const accion = anexo.activo === 'S'
      ? 'desactivar'
      : 'activar';
    Swal.fire({
      title:`¿Desea ${accion} este anexo?`,
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Sí',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.anexoService.cambiarEstado(anexo.id)
        .subscribe({
          next:()=>{
            if(this.rol === 'ADMINISTRADOR'){
              this.anexoService.listarTodas()
              .subscribe(lista=>{
                this.anexos = lista;
                this.anexosOriginales = lista;
                this.agruparAnexos();
              });
            }else{
              this.anexoService.listarActivos()
              .subscribe(lista=>{
                this.anexos = lista;
                this.anexosOriginales = lista;
                this.agruparAnexos();
              });
            }
            Swal.fire({
              icon:'success',
              title:'¡Estado actualizado!',
              text:'El estado del anexo fue actualizado correctamente.',
              confirmButtonText:'Aceptar'
            });
          },
          error:(error)=>{
            Swal.fire({
              icon:'error',
              title:'Error',
              text:error.error.message || 'No se pudo cambiar el estado.',
              confirmButtonText:'Aceptar'
            });
          }
        });
      }
    });
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