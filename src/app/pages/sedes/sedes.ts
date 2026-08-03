import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SedeJudicial } from '../../models/sedeJudicial.model';
import { SedeJudicialService } from '../../services/sedeJudicial.service';

import { SedeFormComponent } from '../../components/sedes/sede-form/sede-form';

@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [
    CommonModule,
    SedeFormComponent
  ],
  templateUrl: './sedes.html',
  styleUrl: './sedes.css'
})
export class SedesComponent implements OnInit {

  sedes: SedeJudicial[] = [];
  sedesOriginales: SedeJudicial[] = [];

  cargando = false;

  mostrarFormulario = false;

  modoFormulario: 'crear' | 'editar' = 'crear';

  sedeSeleccionada?: SedeJudicial;


  constructor(
    private sedeService: SedeJudicialService
  ) {}


  ngOnInit(): void {
    this.cargarSedes();
  }


  cargarSedes(): void {

    this.cargando = true;
    this.sedeService.listar()
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
    this.cargarSedes();
    this.cerrarFormulario();
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

  cambiarEstado(sede: SedeJudicial): void {

    const nuevoEstado =
        sede.activo === 'A'
        ? 'I'
        : 'A';


    this.sedeService
        .cambiarEstado(
            sede.id,
            sede.activo !== 'A'
        )
        .subscribe({

            next: () => {

                this.cargarSedes();

            },

            error: (error) => {

                console.error(
                    'Error cambiando estado',
                    error
                );

            }

        });

}


}