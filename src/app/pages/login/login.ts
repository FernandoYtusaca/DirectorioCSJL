import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginRequest } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

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

        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Hola, ${respuesta.nombres}`,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
            this.router.navigate(['/dependencias']);
        });

      },

      error: (error) => {

        console.error(error);
        Swal.fire({
          icon:'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos'
        });

      }

    });

  }

}
