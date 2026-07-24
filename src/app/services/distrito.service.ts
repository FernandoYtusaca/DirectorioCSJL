import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Distrito } from "../models/distrito.model";
import { Observable } from "rxjs";

@Injectable({ 
    providedIn : 'root'
})

export class DistritoService {

    private apiUrl = `${environment.apiUrl}/api/distritos`;
    
    constructor(
        private http: HttpClient
    ) {}

    listar(): Observable<Distrito[]> {
        return this.http.get<Distrito[]>(this.apiUrl);
    }

    listarPorProvincia(
        provinciaId: number
    ): Observable<Distrito[]>{
        return this.http.get<Distrito[]>(
            `${this.apiUrl}/provincia/${provinciaId}`
        );
    }
}