import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { SedeJudicial } from '../models/sedeJudicial.model';

@Injectable({
  providedIn: 'root'
})
export class SedeJudicialService {

  private apiUrl = `${environment.apiUrl}/api/sedes`;

  constructor(private http: HttpClient) { }

  listar(): Observable<SedeJudicial[]> {
    return this.http.get<SedeJudicial[]>(this.apiUrl);
  }

  listarActivas(): Observable<SedeJudicial[]> {
    return this.http.get<SedeJudicial[]>(`${this.apiUrl}/activos`);
  }

}
