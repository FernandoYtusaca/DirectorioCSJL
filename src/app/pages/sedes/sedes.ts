import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SedeJudicial } from '../../models/sedeJudicial.model';
import { SedeJudicialService } from '../../services/sedeJudicial.service';

import { SedeFormComponent } from '../../components/sedes/sede-form/sede-form';

import { BuscadorComponent } from '../../shared/buscador/buscador';
import { EstadoBadgeComponent } from '../../shared/estado-badge/estado-badge';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';

import { ModalDetalleSedeComponent } from './modales/modal-detalle-sede/modal-detalle-sede';
import { Distrito } from '../../models/distrito.model';
import { DistritoService } from '../../services/distrito.service';


@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [
    CommonModule,
    SedeFormComponent,
    BuscadorComponent,
    EstadoBadgeComponent,
    ConfirmDialogComponent,
    ModalDetalleSedeComponent
  ],
  templateUrl: './sedes.html',
  styleUrl: './sedes.css'
})
export class Sedes implements OnInit {


  sedes: SedeJudicial[] = [];

  sedesOriginales: SedeJudicial[] = [];

  distritos: Distrito[] = [];


  mostrarFormulario = false;

  mostrarConfirmacion = false;


  modoFormulario: 'crear' | 'editar' = 'crear';


  sedeSeleccionada?: SedeJudicial;

  distritoDetalle = '';

  mostrarDetalle = false;

  sedeDetalle?: SedeJudicial;

  sedeParaCambiarEstado?: SedeJudicial;


  cargando = false;


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
    this.sedeService
    .listar()
    .subscribe({
      next: (data) => {
        this.sedes = data;
        this.sedesOriginales = [...data];
        this.cargando = false;
      },
      
      error: (error) => {
        console.error(
          'Error cargando sedes:',
          error
        );
        
        this.cargando = false;
      }
    });
  }

  cargarDistritos(): void {
    this.distritoService
    .listar()
    .subscribe({
      next: (data) => {
        this.distritos = data;
      },

      error: (error) => {
        console.error(
          'Error cargando distritos:',
          error
        );
      }
    });
  }

  obtenerNombreDistrito(
    distritoId: number
  ): string {
    const distrito =
    this.distritos.find(
      d => d.id === distritoId
    );
    
    return distrito
    ? distrito.nombre
    : 'No disponible';
  }


  nuevaSede(): void {

    this.modoFormulario = 'crear';

    this.sedeSeleccionada = undefined;

    this.mostrarFormulario = true;

  }


  editarSede(sede: SedeJudicial): void {

    this.modoFormulario = 'editar';

    this.sedeSeleccionada = {
      ...sede
    };

    this.mostrarFormulario = true;

  }


  cerrarFormulario(): void {

    this.mostrarFormulario = false;

    this.sedeSeleccionada = undefined;

  }


  guardarSede(): void {

    this.cerrarFormulario();

    this.cargarSedes();

  }


  filtrar(texto: string): void {

    const valor = texto
      .trim()
      .toLowerCase();


    if (!valor) {

      this.sedes = [
        ...this.sedesOriginales
      ];

      return;

    }


    this.sedes =
      this.sedesOriginales.filter(
        sede =>

          (sede.nombre ?? '')
            .toLowerCase()
            .includes(valor)

          ||

          (sede.direccion ?? '')
            .toLowerCase()
            .includes(valor)

          ||

          (sede.telefono ?? '')
            .toLowerCase()
            .includes(valor)

      );

  }


  solicitarCambioEstado(
    sede: SedeJudicial
  ): void {

    this.sedeParaCambiarEstado = sede;

    this.mostrarConfirmacion = true;

  }


  confirmarCambioEstado(): void {

    if (!this.sedeParaCambiarEstado) {

      return;

    }


    const sede =
      this.sedeParaCambiarEstado;


    const nuevoEstado =
      sede.activo !== 'A';


    this.sedeService
      .cambiarEstado(
        sede.id,
        nuevoEstado
      )
      .subscribe({

        next: () => {

          this.cerrarConfirmacion();

          this.cargarSedes();

        },

        error: (error) => {

          console.error(
            'Error cambiando estado:',
            error
          );

          this.cerrarConfirmacion();

        }

      });

  }


  cerrarConfirmacion(): void {
    this.mostrarConfirmacion = false;
    this.sedeParaCambiarEstado = undefined;

  }

  abrirDetalle(sede: SedeJudicial): void {
    this.sedeDetalle = {
      ...sede
    };

    this.distritoDetalle =
    this.obtenerNombreDistrito(
      sede.distritoId
    );

    this.mostrarDetalle = true;
  }
  
  cerrarDetalle(): void {
    this.mostrarDetalle = false;
    this.sedeDetalle = undefined;
    this.distritoDetalle = '';
  }

}