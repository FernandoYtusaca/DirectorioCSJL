import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  login: LoginRequest = {
    correo: '',
    contrasena: ''
  };

  mensaje: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  iniciarSesion(){

    this.authService.login(this.login)
    .subscribe({

      next: (respuesta) => {

        localStorage.removeItem('usuario');

        localStorage.setItem(
          'usuario',
          JSON.stringify(respuesta)
        );

        this.router.navigate(['/dependencias']);

      },

      error: (error) => {

        console.error(error);

        this.mensaje = 'Usuario o contraseña incorrectos';

      }

    });

  }

}
