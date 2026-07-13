import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricasDependencia } from '../../../../core/models/dependencia.model';

/** Componente de presentación: solo pinta los widgets numéricos. */
@Component({
  selector: 'app-metricas-dependencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metricas-dependencias.html',
  styleUrl: './metricas-dependencias.css'
})
export class MetricasDependenciasComponent {
  @Input() metricas: MetricasDependencia = {
    totalJuzgados: 0,
    totalUnidades: 0,
    totalAnexos: 0
  };
}
