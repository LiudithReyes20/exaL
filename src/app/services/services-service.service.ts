import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesServiceService {

  private apiUrl = 'http://localhost/hotelreservation/'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) { } // Corregir "hhtp" a "http"

  getAllServices(): Observable<any>{
    const params = { action: 'getAllServices' }; // Agregar parámetro "action"
    return this.http.get<any>(this.apiUrl + 'service.php', { params }); 
  }

  crearServicio(nuevoServicio: { nombre: string; descripcion: string }): Observable<any> {
    const params = { action: 'addService' };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const queryString = new URLSearchParams(params as any).toString();
    const url = `${this.apiUrl}service.php?${queryString}`;

    return this.http.post(url, nuevoServicio, { headers });
  }
}