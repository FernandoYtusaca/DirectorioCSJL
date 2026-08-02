import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Anexo } from '../models/anexo.model';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  private apiUrl = `${environment.apiUrl}/api/anexo`;

  constructor(private http: HttpClient) { }

  // Listar todos los anexos
  listarTodas(): Observable<Anexo[]> {
    return this.http.get<Anexo[]>(this.apiUrl);
  }

  // Listar anexos activos
  listarActivos(): Observable<Anexo[]> {
    return this.http.get<Anexo[]>(`${this.apiUrl}/activos`);
  }

  // Buscar por ID
  buscarPorId(id: number): Observable<Anexo> {
    return this.http.get<Anexo>(`${this.apiUrl}/${id}`);
  }

  // Listar anexos de una dependencia
  listarPorDependencia(dependenciaId: number): Observable<Anexo[]> {
    return this.http.get<Anexo[]>(
      `${this.apiUrl}/dependencia/${dependenciaId}`
    );
  }

  // Registrar
  guardar(anexo: Anexo): Observable<Anexo> {
    return this.http.post<Anexo>(this.apiUrl, anexo);
  }

  // Actualizar
  actualizar(id: number, anexo: Anexo): Observable<Anexo> {
    return this.http.put<Anexo>(
      `${this.apiUrl}/${id}`,
      anexo
    );
  }

  // Activar / Desactivar
  cambiarEstado(id: number): Observable<Anexo> {
    return this.http.patch<Anexo>(
      `${this.apiUrl}/${id}/estado`,
      {}
    );
  }

}