import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  onProfileClick() {
    console.log('Click en el perfil completo del administrador');
    // Aquí podrás abrir un menú desplegable o ir a la configuración del perfil más adelante
  }

}
