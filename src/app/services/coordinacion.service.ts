import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Coordinacion } from '../models/coordinacion.model';

@Injectable({
  providedIn: 'root'
})
export class CoordinacionService {

  private apiUrl = `${environment.apiUrl}/api/coordinacion`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Coordinacion[]> {
    return this.http.get<Coordinacion[]>(this.apiUrl);
  }

  listarPorUnidadAdministrativa(unidadId: number): Observable<Coordinacion[]> {
    return this.http.get<Coordinacion[]>(
      `${this.apiUrl}/unidadAdministrativa/${unidadId}`
    );
  }

}
