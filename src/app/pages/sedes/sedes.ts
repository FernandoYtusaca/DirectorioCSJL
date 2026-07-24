import Swal from 'sweetalert2';

import { Distrito } from '../../models/distrito.model';
import { DistritoService } from '../../services/distrito.service';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SedeJudicialService } from '../../services/sedeJudicial.service';
import { SedeJudicial } from '../../models/sedeJudicial.model';

@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './sedes.html',
  styleUrl: './sedes.css',
})
export class Sedes implements OnInit {
  sedes: SedeJudicial[] = [];
  distritos: Distrito[] = [];
  sedeSeleccionada?: SedeJudicial;

  modoEdicion = false;
  cargando = false;
  guardando = false;
  sedeEditando: SedeJudicial = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    distritoId: 0,
    mapa: '',
    activo: '',
    fechaCreacion: '',
    horaCreacion: ''
  };

  constructor(
    private sedeService: SedeJudicialService,
    private distritoService: DistritoService
  ) {}

  ngOnInit(): void {
    this.cargarSedes();
    this.cargarDistritos();
  }

  cargarSedes(): void {
    this.cargando = true;
    this.sedeService.listar().subscribe({
      next: (data) => {
        this.sedes = data;
        if (data.length > 0) {
          this.sedeSeleccionada = data[0];
          this.seleccionarSede();
        }
        this.cargando = false;
      },
      
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  seleccionarSede(): void {
    if (!this.sedeSeleccionada) {
      return;
    }
    
    this.sedeService
    .obtenerPorId(this.sedeSeleccionada.id)
    .subscribe({
      next: (sede) => {
        this.sedeSeleccionada = sede;
        this.sedeEditando = { ...sede };
      },      
      error: (err) => {
        console.error(err);
      }    
    });
  }

  editar(): void {
    if (!this.sedeSeleccionada) {
      return;
    }
    
    this.sedeEditando = { ...this.sedeSeleccionada };
    this.modoEdicion = true;
  }
  
  cancelar(): void {
    this.modoEdicion = false;
  }
  
  guardar(): void {
    this.guardando = true; // Comienza la operación de guardado
    if (this.sedeEditando.id === 0) {
      this.sedeService
      .guardar(this.sedeEditando)
      .subscribe({
        next: (sede) => {
          this.sedes.push(sede);
          this.sedeSeleccionada = sede;
          this.sedeEditando = { ...sede };
          this.modoEdicion = false;
          this.guardando = false; // Finalizó correctamente
          Swal.fire({
            icon:'success',
            title:'Correcto',
            text:'La sede fue registrada correctamente.'
          });
        }

      });
    } else {
      this.sedeService
      .actualizar(
        this.sedeEditando.id,
        this.sedeEditando
      )
      .subscribe({
        next: (sede) => {
          const indice = this.sedes.findIndex(
            x => x.id === sede.id
          );
          this.sedes[indice] = sede;
          this.sedeSeleccionada = sede;
          this.sedeEditando = { ...sede };
          this.modoEdicion = false;
          this.guardando = false;
          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'La sede fue actualizada correctamente.'
          });
        }
      });
    }
  }

  cambiarEstado(): void {
    if (!this.sedeSeleccionada) {
      return;
    }    
    this.sedeService
    .cambiarEstado(this.sedeSeleccionada.id)
    .subscribe({
      next: (sede) => {
        this.sedeSeleccionada = sede;
        this.sedeEditando = { ...sede };
      },      
      error: (err) => {
        this.guardando = false;   // Finalizó con error
        console.error(err);
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'No fue posible guardar la sede.'
        });
      }
    });
  }

  nuevaSede(): void {
    this.sedeSeleccionada = undefined;
    this.sedeEditando = {
      id: 0,
      nombre: '',
      direccion: '',
      telefono: '',
      distritoId: 0,
      mapa: '',
      activo: 'S',
      fechaCreacion: '',
      horaCreacion: ''
    };
    
    this.modoEdicion = true;
  }

  cargarDistritos(): void {
    this.distritoService.listar().subscribe({
      next: (data) => {
        this.distritos = data;
      },
      
      error: (err) => {
        console.error("Error cargando distritos", err);
      }
    });
  }

}