import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Dependencia } from '../models/dependencia.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {

  private apiUrl = `${environment.apiUrl}/api/dependencia`;

  constructor(private http: HttpClient) { }

  // Lista todas las dependencias 
  listarTodas(): Observable<Dependencia[]> {
    return this.http.get<Dependencia[]>(this.apiUrl);
  }

  // Lista dependencias activas
  listarActivas(): Observable<Dependencia[]> {
    return this.http.get<Dependencia[]>(`${this.apiUrl}/activos`);
  }

  // Buscar una dependencia por Id
  buscarPorId(id: number): Observable<Dependencia> {
    return this.http.get<Dependencia>(`${this.apiUrl}/${id}`);
  }

  // Registrar una dependencia
  guardar(dependencia: Dependencia): Observable<Dependencia> {
    return this.http.post<Dependencia>(this.apiUrl, dependencia);
  }

  // Actualizar una dependencia
  actualizar(id: number, dependencia: Dependencia): Observable<Dependencia> {
    return this.http.put<Dependencia>(
      `${this.apiUrl}/${id}`,
      dependencia
    );
  }

  // Activar o desactivar una dependencia
  cambiarEstado(id: number): Observable<Dependencia> {
    return this.http.patch<Dependencia>(
      `${this.apiUrl}/${id}/estado`,
      {}
    );
  }

}