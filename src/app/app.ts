import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Header } from './layouts/header/header';
import { Sidebar } from './layouts/sidebar/sidebar';
import { Footer } from './layouts/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('DirectoriosCsjl');

  rutaActual = '';

  constructor(private router: Router){
    
    this.rutaActual = this.router.url;
    
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.rutaActual = event.urlAfterRedirects;
      }
    });
  }

  esLogin(): boolean {
    return this.rutaActual === '/login';
  }

}
