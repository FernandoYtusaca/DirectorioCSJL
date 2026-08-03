import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Provincia } from "../models/provincia.model";

@Injectable({ 
    providedIn : 'root'
})

export class ProvinciaService {

    private apiUrl = `${environment.apiUrl}/api/provincias`;
    
    constructor(
        private http: HttpClient
    ){}

    listar(): Observable<Provincia[]>{
        return this.http.get<Provincia[]>(this.apiUrl);
    }

    listarPorDepartamento(
        departamentoId: number
    ): Observable<Provincia[]>{
        return this.http.get<Provincia[]>(
            `${this.apiUrl}/departamento/${departamentoId}`
        );
    }
}