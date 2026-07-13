import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
<<<<<<< HEAD

  onProfileClick() {
    console.log('Click en el perfil completo del administrador');
    // agregar un menú desplegable para la configuracion del perfil
  }

}
=======
  constructor() {
    console.log('Header cargado');
  }
  
  abrirPerfil(): void {
  console.log('Perfil seleccionado');
  // Aquí puedes abrir un menú, un drawer o navegar
}
}
>>>>>>> 2d859e965d7536af7d50e97c3855ca431f2b6169
