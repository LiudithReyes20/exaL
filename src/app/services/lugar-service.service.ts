import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LugarServiceService {

  //private apiUrl = 'http://localhost/hotelreservation/ObtenerHotelesPorLugar.php?lugares';
  private apiUrl = 'http://localhost/hotelreservation/';

  constructor(private http: HttpClient) {}

  getHoteles(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'ObtenerHotelesPorLugar.php?lugares');
  }

  agregarLugar(nuevoLugar: { nombre: string; descripcion: string }): Observable<any> {
    const params = { action: 'addPlace' };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const queryString = new URLSearchParams(params as any).toString();
    const url = `${this.apiUrl}lugar.php?${queryString}`;

    return this.http.post(url, nuevoLugar, { headers });
  }
}
