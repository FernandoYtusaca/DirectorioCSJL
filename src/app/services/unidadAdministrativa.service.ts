import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UnidadAdministrativa } from '../models/unidadAdministrativa.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadAdministrativaService {

  private apiUrl = `${environment.apiUrl}/api/unidadAdministrativa`;

  constructor(private http: HttpClient) { }

  listar(): Observable<UnidadAdministrativa[]> {
    return this.http.get<UnidadAdministrativa[]>(this.apiUrl);
  }

}
