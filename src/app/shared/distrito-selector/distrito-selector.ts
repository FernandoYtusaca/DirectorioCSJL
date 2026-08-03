import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Distrito } from '../../models/distrito.model';
import { DistritoService } from '../../services/distrito.service';

@Component({
  selector: 'app-distrito-selector',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './distrito-selector.html',
  styleUrl: './distrito-selector.css'
})

export class DistritoSelectorComponent implements OnInit {
  @Input()
  distritoSeleccionado: number = 0;

  @Output()
  distritoChange = new EventEmitter<number>();

  distritos: Distrito[] = [];

  constructor(
    private distritoService: DistritoService
  ) {}

  ngOnInit(): void {
    this.cargarDistritos();
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
          'Error cargando distritos',
          error
        );
      }
    });
  }
  
  seleccionarDistrito(event: Event): void {
    const select =
    event.target as HTMLSelectElement;
    this.distritoChange.emit(
      Number(select.value)
    );
  }


}