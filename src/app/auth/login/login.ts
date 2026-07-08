import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- Es vital importar ReactiveFormsModule aquí
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  onLogin() {
    if (this.loginForm.valid) {
      console.log('Datos enviados:', this.loginForm.value);
      
      Swal.fire({
        title: "¡Inicio de sesion Correctos!",
        text: "Bienvenido al Sistema",
        icon: "success",
        draggable: true
      }).then (() => {
        this.router.navigate(['/dashboard']);
      });

    } else {
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched(); 
    }
  }
}