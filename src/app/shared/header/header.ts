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
    // agregar un menú desplegable para la configuracion del perfil
  }

}
