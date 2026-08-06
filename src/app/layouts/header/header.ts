import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  cerrarSesion(){
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
