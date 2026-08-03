import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SedeJudicial } from '../../../models/sedeJudicial.model';
import { SedeJudicialService } from '../../../services/sedeJudicial.service';

import { DistritoSelectorComponent } from '../../../shared/distrito-selector/distrito-selector';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-sede-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    }

    else {
      this.inicializarFormulario();
    }
  }

  @Output()
  guardado = new EventEmitter<void>();

  @Output()
  cancelado = new EventEmitter<void>();

  form!: FormGroup;
  formulario!: SedeJudicial;
  mapaSeguro?: SafeResourceUrl;

  guardando = false;

  constructor(
    private fb: FormBuilder,
    private sedeService: SedeJudicialService,
    private sanitizer: DomSanitizer
  ) {
    this.inicializarFormulario();
    this.crearFormulario();
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

    if (this.formulario.distritoId === 0) {
      alert('Seleccione un distrito.');
      return false;
    }
    return true;
  }


  crearSede(): void {
    this.sedeService
    .crear(this.formulario)
    .subscribe({
      next: () => {
        this.guardando = false;
        this.guardado.emit();
      },
      error: error => {
        console.error(error);
        alert('No se pudo registrar la sede.');
      }
    });
  }

  actualizarSede(): void {
    this.sedeService
    .actualizar(
      this.formulario.id,
      this.formulario
    )
    .subscribe({
      next: () => {
        this.guardado.emit();
      },
      error: error => {
        this.guardando = false;
        console.error(error);
        alert('No se pudo actualizar la sede.');
      }
    });
  }

  cancelar(): void {
    this.cancelado.emit();
  }

  actualizarMapa(): void {
    if(this.formulario.mapa){
      this.mapaSeguro =
      this.sanitizer.bypassSecurityTrustResourceUrl(
        this.formulario.mapa
      );

    } 
    else {
      this.mapaSeguro = undefined;
    }
  }

  private crearFormulario(): void {
    this.form = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      
      direccion: [
        '',
        Validators.required
      ],
      
      telefono: [
        '',
        Validators.required
      ],
      
      distritoId: [
        0,
        Validators.required
      ],
      
      mapa: [''],
      activo: ['A']
    });
  }


}