import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginRequest } from '../models/login.model';
import { LoginResponse } from '../models/login-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'http://localhost:8080/api/usuario';


  constructor(
    private http: HttpClient
  ){}


  login(datos: LoginRequest){
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      datos
    );
  }

  obtenerUsuario(){
    const usuario = localStorage.getItem('usuario');
    return usuario 
        ? JSON.parse(usuario)
        : null;
   }

   cerrarSesion(){
    localStorage.removeItem('usuario');
   }

}