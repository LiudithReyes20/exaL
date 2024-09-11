import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {


  private apiUrl = 'http://localhost/hotelreservation/';
  constructor(private http: HttpClient) {}

  getHoteles(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAllHoteles(): Observable<any>{
    
    return this.http.get<any>(this.apiUrl + 'ObtenerHotelesPorLugar.php?hoteles');
  }

  crearHotel(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      // Aquí puedes agregar encabezados si los necesitas, por ejemplo, autorización
      // 'Authorization': 'Bearer <token>',
    });

    return this.http.post(this.apiUrl + 'ObtenerHotelesPorLugar.php', formData, { headers });
  }

  getHotelDetails(id_hotel: any): Observable<any>{
    return this.http.get<any>(this.apiUrl + 'hotel.php?action=getHotelDetails&id_hotel='+id_hotel);
  }

  crearHabitacion(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl + 'hotel.php?action=addRoom', JSON.stringify(formData), { headers });
  }
  
}

