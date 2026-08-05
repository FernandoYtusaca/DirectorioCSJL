import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estado-badge',
  standalone: true,
  imports: [],
  templateUrl: './estado-badge.html',
  styleUrl: './estado-badge.css'
})
export class EstadoBadgeComponent {

  @Input()
  estado: string = 'I';


  get esActivo(): boolean {

    return this.estado === 'A';

  }


  get texto(): string {

    return this.esActivo
      ? 'Activo'
      : 'Inactivo';

  }

}