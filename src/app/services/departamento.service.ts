import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Departamento } from "../models/departamento.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class DepartamentoService {
    private apiUrl = `${environment.apiUrl}/api/departamentos`;

    constructor (private http: HttpClient) {}

    listar(): Observable<Departamento[]>{
        return this.http.get<Departamento[]> (this.apiUrl);
    }
}







