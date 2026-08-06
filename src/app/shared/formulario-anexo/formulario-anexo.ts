import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Anexo } from '../../models/anexo.model';
import { Dependencia } from '../../models/dependencia.model';
import { DependenciaService } from '../../services/dependencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-anexo',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-anexo.html',
  styleUrl: './formulario-anexo.css',
})
export class FormularioAnexo implements OnInit{

  @Input() anexo!: Anexo;
  @Input() modoEdicion = false;
  @Output() guardar = new EventEmitter<Anexo>();
  @Output() cancelar = new EventEmitter<void>();

  dependencias: Dependencia[] = [];
  constructor(
    private dependenciaService: DependenciaService
  ){}

  ngOnInit(): void {
    this.cargarDependencias();
  }

  cargarDependencias(){
    this.dependenciaService
    .listarActivas()
    .subscribe(data => {
      this.dependencias = data;
    });
  }

  soloNumeros(event: KeyboardEvent){
    const tecla = event.key;
    if(!/[0-9]/.test(tecla)){
      event.preventDefault();
    }
  }

  guardarCambios(){

    if(!this.anexo.numero || this.anexo.numero.trim() === ''){
      Swal.fire({
        icon: 'warning',
        title: 'Campo obligatorio',
        text: 'El número de anexo es obligatorio.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if(!/^[0-9]{5}$/.test(this.anexo.numero)){
      Swal.fire({
        icon: 'warning',
        title: 'Número inválido',
        text: 'El anexo debe contener exactamente 5 dígitos numéricos.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if(!this.anexo.dependenciaId){
      Swal.fire({
        icon: 'warning',
        title: 'Campo obligatorio',
        text: 'Debe seleccionar una dependencia.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.guardar.emit(this.anexo);
  }

  cancelarEdicion(){
    this.cancelar.emit();
  }

}
