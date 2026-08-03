import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { NivelJurisdiccional } from '../models/nivelJurisdiccional.model';

@Injectable({
  providedIn: 'root'
})
export class NivelJurisdiccionalService {

  private apiUrl = `${environment.apiUrl}/api/nivelJurisdiccional`;

  constructor(private http: HttpClient) { }

  listar(): Observable<NivelJurisdiccional[]> {
    return this.http.get<NivelJurisdiccional[]>(this.apiUrl);
  }

}
