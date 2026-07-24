import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Especialidad } from '../models/especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private apiUrl = `${environment.apiUrl}/api/especialidad`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.apiUrl);
  }

  listarPorNivel(nivelId: number): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(
      `${this.apiUrl}/nivelJurisdiccional/${nivelId}`
    );
  }

}
