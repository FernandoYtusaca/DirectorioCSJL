import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { TipoDependencia } from '../models/tipoDependencia.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDependenciaService {

  private apiUrl = `${environment.apiUrl}/api/tiposDependencia`;

  constructor(private http: HttpClient) { }

  listar(): Observable<TipoDependencia[]> {
    return this.http.get<TipoDependencia[]>(this.apiUrl);
  }

}
