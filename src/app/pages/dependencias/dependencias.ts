import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dependencia } from '../../models/dependencia.model';
import { DependenciaService } from '../../services/dependencia.service';
import { FiltrosDependencias } from '../../filtros/filtros-dependencias/filtros-dependencias';
import { ModalDetalleDependencia } from './modales/modal-detalle-dependencia/modal-detalle-dependencia';
import { ModadlEditarDependencia } from './modales/modal-editar-dependencia/modal-editar-dependencia';
import { ModalRegistrarDependencia } from './modales/modal-registrar-dependencia/modal-registrar-dependencia';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-dependencias',
  imports: [CommonModule, FiltrosDependencias, ModalDetalleDependencia, ModadlEditarDependencia, ModalRegistrarDependencia], 
  templateUrl: './dependencias.html',
  styleUrl: './dependencias.css',
})
export class Dependencias implements OnInit{

  dependencias: Dependencia[] = [];
  dependenciasOriginales: Dependencia[] = [];

  usuario: any;
  rol = '';

  //modal
  mostrarModal = false;
  dependenciaSeleccionada!: Dependencia;

  mostrarModalEditar = false;
  dependenciaEditar!: Dependencia;

  mostrarModalRegistrar = false;
  nuevaDependencia!: Dependencia;
  

  constructor(
    private dependenciaService: DependenciaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.usuario = this.authService.obtenerUsuario();
    this.rol = this.usuario?.rol?.trim().toUpperCase();

    if (this.rol === 'ADMINISTRADOR') {

      this.dependenciaService.listarTodas()
        .subscribe(data => {
          this.dependencias = data;
          this.dependenciasOriginales = data;
        });

    } else {

      this.dependenciaService.listarActivas()
        .subscribe(data => {
          this.dependencias = data;
          this.dependenciasOriginales = data;
        });

    }

  }

  recibirFiltros(filtros: any){

      this.dependencias = this.dependenciasOriginales.filter(dep => {
        let coincide = true;

        if(filtros.sedeId){
          coincide = coincide &&
          dep.sedeJudicialId == filtros.sedeId;

        }

        if(filtros.tipoDependenciaId){
          coincide = coincide &&
          dep.tipoDependenciaId == filtros.tipoDependenciaId;
        }

        if(filtros.nivelJurisdiccionalId){
          coincide = coincide &&
            dep.nivelJurisdiccionalId == filtros.nivelJurisdiccionalId;
        }

        if(filtros.especialidadId){
          coincide = coincide &&
          dep.especialidadId == filtros.especialidadId;
        }

        if(filtros.unidadAdministrativaId){
          coincide = coincide &&
            dep.unidadAdministrativaId == filtros.unidadAdministrativaId;
        }

        if(filtros.coordinacionId){
          coincide = coincide &&
          dep.coordinacionId == filtros.coordinacionId;
        }

        if(filtros.nombre){
          coincide = coincide &&
          dep.nombre
          .toLowerCase()
          .includes(
            filtros.nombre.toLowerCase()
          );

        }
        return coincide;

      });
    }


    cambiarEstado(dep: Dependencia) {
      const accion = dep.activo === 'S'
        ? 'desactivar'
        : 'activar';

      Swal.fire({
        title: `¿Desea ${accion} esta dependencia?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.isConfirmed) {
          this.dependenciaService
            .cambiarEstado(dep.id)
            .subscribe({
              next: (data) => {
                dep.activo = data.activo;
                Swal.fire({
                  icon: 'success',
                  title: '¡Estado actualizado!',
                  text: 'El estado de la dependencia fue actualizado correctamente.',
                  confirmButtonText: 'Aceptar'
                });
              },
              error: (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.error.message,
                  confirmButtonText: 'Aceptar'
                });
              }
            });
        }
      });
    }

    abrirModal(dependencia: Dependencia){
      this.dependenciaSeleccionada = dependencia;
      this.mostrarModal = true;
    }

    cerrarModal(){
      this.mostrarModal = false;
    }

    abrirEditar(dep: Dependencia){
      this.dependenciaEditar ={...dep};
      this.mostrarModalEditar = true;
    }

    cerrarEditar(){
      this.mostrarModalEditar = false;
    }

    guardarEdicion(dep: Dependencia){
      Swal.fire({
        title: '¿Desea guardar los cambios?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.dependenciaService
          .actualizar(dep.id, dep)
          .subscribe({
            next: (data) => {

              const index = this.dependencias.findIndex(d => d.id === data.id);
              if(index !== -1){
                this.dependencias[index] = data;
              }

              const indexOriginal = this.dependenciasOriginales.findIndex(d => d.id === data.id);
              if(indexOriginal !== -1){
                this.dependenciasOriginales[indexOriginal] = data;
              }
              this.cerrarEditar();

              Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'La dependencia fue actualizada correctamente.',
                confirmButtonText: 'Aceptar'
              });
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: error.error.message,
                confirmButtonText: 'Aceptar'
              });
            }
          }); 
        }
      });
    }

    //Registrar
    abrirRegistrar() {

      this.nuevaDependencia = {
        id: 0,
        nombre: '',
        piso: '',

        sedeJudicialId: undefined as any,
        sedeJudicialNombre: '',

        tipoDependenciaId: undefined as any,
        tipoDependenciaNombre: '',

        nivelJurisdiccionalId: undefined as any,
        nivelJurisdiccionalNombre: '',

        especialidadId: undefined,
        especialidadNombre: '',

        unidadAdministrativaId: undefined,
        unidadAdministrativaNombre: '',

        coordinacionId: undefined,
        coordinacionNombre: '',

        activo: 'S',
        fechaCreacion: '',
        horaCreacion: ''

      };

      this.mostrarModalRegistrar = true;

    }


    cerrarRegistrar(){
      this.mostrarModalRegistrar =  false;
    }

    guardarNuevaDependencia(dep: Dependencia) {
      Swal.fire({
        title: '¿Desea registrar esta dependencia?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, registrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.dependenciaService.guardar(dep).subscribe({
            next: () => {
              this.dependenciaService.listarTodas().subscribe(lista => {
                this.dependencias = lista;
                this.dependenciasOriginales = lista;
              });
              this.cerrarRegistrar();
              Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'La dependencia fue registrada correctamente',
                confirmButtonText: 'Aceptar'
              });
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.error.message,
                confirmButtonText: 'Aceptar'
              });
            }
          });
        }
      });
    }

}
