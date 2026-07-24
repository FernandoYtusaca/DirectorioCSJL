import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dependencia } from '../../models/dependencia.model';
import { DependenciaService } from '../../services/dependencia.service';
import { FiltrosDependencias } from '../../filtros/filtros-dependencias/filtros-dependencias';
import { ModalDetalleDependencia } from './modales/modal-detalle-dependencia/modal-detalle-dependencia';
import { ModadlEditarDependencia } from './modales/modal-editar-dependencia/modal-editar-dependencia';


@Component({
  selector: 'app-dependencias',
  imports: [CommonModule, FiltrosDependencias, ModalDetalleDependencia, ModadlEditarDependencia], 
  templateUrl: './dependencias.html',
  styleUrl: './dependencias.css',
})
export class Dependencias implements OnInit{

  dependencias: Dependencia[] = [];
  dependenciasOriginales: Dependencia[] = [];

  // Simulación del rol. TEMPORAL
  rol = 'ADMIN';

  //modal
  mostrarModal = false;
  dependenciaSeleccionada!: Dependencia;

  mostrarModalEditar = false;
  dependenciaEditar!: Dependencia;
  

  constructor(
    private dependenciaService: DependenciaService
  ) { }

  ngOnInit(): void {

    if (this.rol === 'ADMIN') {

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
     console.log(filtros);

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


    cambiarEstado(dep: Dependencia){

      console.log("Click", dep)
      this.dependenciaService.cambiarEstado(dep.id)
        .subscribe(data => {
          console.log(data);
        dep.activo = data.activo;
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
      this.dependenciaService
      .actualizar(dep.id, dep)
      .subscribe(data => {
        const index = this.dependencias.findIndex(d => d.id === data.id);
        if(index !== -1){
          this.dependencias[index] = data;
        }
        const indexOriginal = this.dependenciasOriginales.findIndex(d => d.id === data.id);
        if(indexOriginal ! == -1){
          this.dependenciasOriginales[indexOriginal] = data;
        }

        this.cerrarEditar();
      })
    }

}
