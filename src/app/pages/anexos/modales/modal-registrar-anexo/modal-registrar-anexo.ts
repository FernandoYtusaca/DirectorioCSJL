import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Anexo } from '../../../../models/anexo.model';
import { Dependencia } from '../../../../models/dependencia.model';
import { DependenciaService } from '../../../../services/dependencia.service';

@Component({
  selector: 'app-modal-registrar-anexo',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-registrar-anexo.html',
  styleUrl: './modal-registrar-anexo.css',
})
export class ModalRegistrarAnexo implements OnInit{

  @Output() cerrar = new EventEmitter<void>();

  @Output() guardar = new EventEmitter<Anexo>();

  nuevoAnexo: Anexo = {
    id: 0,
    numero: '',
    dependenciaId: 0,
    dependenciaNombre: '',
    activo: 'S',
    fechaCreacion: ''
  };

  dependencias: Dependencia[] = [];

  constructor(
    private dependenciaService: DependenciaService
  ){}

  ngOnInit(): void{
    this.cargarDependencias();
  }

  cargarDependencias(){
    this.dependenciaService
      .listarTodas()
      .subscribe(data => {
        this.dependencias = data;
      })
  }

  guardarAnexo(){
    this.guardar.emit(this.nuevoAnexo);
  }

  cerrarModal(){
    this.cerrar.emit();
  }

}
