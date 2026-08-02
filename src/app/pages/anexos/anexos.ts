import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Anexo } from '../../models/anexo.model';
import { AnexoService } from '../../services/anexo.service';

@Component({
  selector: 'app-anexos',
  imports: [CommonModule],
  templateUrl: './anexos.html',
  styleUrl: './anexos.css'
})
export class Anexos implements OnInit {

  anexos: Anexo[] = [];
  anexosOriginales: Anexo[] = [];

  // Temporal para pruebas
  rol = 'ADMIN';

  constructor(
    private anexoService: AnexoService
  ) {}

  ngOnInit(): void {

    if (this.rol === 'ADMIN') {

      this.anexoService.listarTodas()
        .subscribe(data => {
          this.anexos = data;
          this.anexosOriginales = data;
        });

    } else {

      this.anexoService.listarActivos()
        .subscribe(data => {
          this.anexos = data;
          this.anexosOriginales = data;
        });

    }

  }

}