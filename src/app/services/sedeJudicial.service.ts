import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SedeJudicial } from '../models/sedeJudicial.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SedeJudicialService {

  private apiUrl = `${environment.apiUrl}/api/sedes`;
  
  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<SedeJudicial[]> {

    return this.http.get<SedeJudicial[]>(
      this.apiUrl
    );

  }



  listarActivas(): Observable<SedeJudicial[]> {

    return this.http.get<SedeJudicial[]>(
      `${this.apiUrl}/activas`
    );

  }



  obtenerPorId(
    id: number
  ): Observable<SedeJudicial> {


    return this.http.get<SedeJudicial>(
      `${this.apiUrl}/${id}`
    );

  }




  crear(
    sede: SedeJudicial
  ): Observable<SedeJudicial> {


    return this.http.post<SedeJudicial>(
      this.apiUrl,
      sede
    );

  }




  actualizar(
    id: number,
    sede: SedeJudicial
  ): Observable<SedeJudicial> {


    return this.http.put<SedeJudicial>(
      `${this.apiUrl}/${id}`,
      sede
    );

  }




  cambiarEstado(
    id:number,
    activo:boolean
  ):Observable<SedeJudicial>{


    return this.http.patch<SedeJudicial>(
      `${this.apiUrl}/${id}/estado`,
      {
        activo
      }
    );


  }


}