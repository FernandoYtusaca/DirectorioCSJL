import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dependencia } from '../../../../models/dependencia.model';
import { Anexo } from '../../../../models/anexo.model';
import { AnexoService } from '../../../../services/anexo.service';

@Component({
  selector: 'app-modal-detalle-dependencia',
  imports: [CommonModule],
  templateUrl: './modal-detalle-dependencia.html',
  styleUrl: './modal-detalle-dependencia.css',
})
export class ModalDetalleDependencia implements OnInit{

  anexos: Anexo[] = [];

  @Input() dependencia!: Dependencia;

  @Output() cerrar = new
  EventEmitter<void>();

  constructor(
    private anexoService: AnexoService
  ) {}

   ngOnInit(): void {

    this.anexoService
      .listarPorDependencia(this.dependencia.id)
      .subscribe(data => {
        this.anexos = data;
      });

  }

  cerrarModal(){
    this.cerrar.emit();
  }
}
