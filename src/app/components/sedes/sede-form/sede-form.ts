import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { SedeJudicial } from '../../../models/sedeJudicial.model';
import { SedeJudicialService } from '../../../services/sedeJudicial.service';
import { DistritoSelectorComponent } from '../../../shared/distrito-selector/distrito-selector';

@Component({
  selector: 'app-sede-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DistritoSelectorComponent
  ],
  templateUrl: './sede-form.html',
  styleUrl: './sede-form.css'
})
export class SedeFormComponent {

  @Input()
  modo: 'crear' | 'editar' = 'crear';

  @Input()
  set sede(value: SedeJudicial | undefined) {

    if (value) {

      this.formulario = {
        ...value
      };

      this.actualizarMapa();

    } else {

      this.inicializarFormulario();

    }

  }

  @Output()
  guardado = new EventEmitter<void>();

  @Output()
  cancelado = new EventEmitter<void>();


  formulario!: SedeJudicial;

  mapaSeguro?: SafeResourceUrl;

  guardando = false;


  constructor(
    private sedeService: SedeJudicialService,
    private sanitizer: DomSanitizer
  ) {

    this.inicializarFormulario();

  }


  inicializarFormulario(): void {

    this.formulario = {

      id: 0,

      nombre: '',

      direccion: '',

      telefono: '',

      distritoId: 0,

      mapa: '',

      activo: 'A',

      fechaCreacion: '',

      horaCreacion: ''

    };

    this.actualizarMapa();

  }


  guardar(): void {

    if (!this.validarFormulario()) {

      return;

    }


    if (this.modo === 'crear') {

      this.crearSede();

    } else {

      this.actualizarSede();

    }

  }


  private validarFormulario(): boolean {

    if (!this.formulario.nombre.trim()) {

      alert('Ingrese el nombre de la sede.');

      return false;

    }


    if (!this.formulario.direccion.trim()) {

      alert('Ingrese la dirección.');

      return false;

    }


    if (!this.formulario.telefono.trim()) {

      alert('Ingrese el teléfono.');

      return false;

    }


    if (!this.formulario.distritoId) {

      alert('Seleccione un distrito.');

      return false;

    }


    return true;

  }


  private crearSede(): void {

    this.guardando = true;

    this.sedeService
      .crear(this.formulario)
      .subscribe({

        next: () => {

          this.guardando = false;

          this.guardado.emit();

        },

        error: (error) => {

          this.guardando = false;

          console.error(
            'Error creando sede:',
            error
          );

        }

      });

  }


  private actualizarSede(): void {

    this.guardando = true;

    this.sedeService
      .actualizar(
        this.formulario.id,
        this.formulario
      )
      .subscribe({

        next: () => {

          this.guardando = false;

          this.guardado.emit();

        },

        error: (error) => {

          this.guardando = false;

          console.error(
            'Error actualizando sede:',
            error
          );

        }

      });

  }


  cancelar(): void {

    if (this.guardando) {

      return;

    }

    this.cancelado.emit();

  }


  actualizarMapa(): void {

    if (this.formulario.mapa) {

      this.mapaSeguro =
        this.sanitizer
          .bypassSecurityTrustResourceUrl(
            this.formulario.mapa
          );

    } else {

      this.mapaSeguro = undefined;

    }

  }

}