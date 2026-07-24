import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
}
