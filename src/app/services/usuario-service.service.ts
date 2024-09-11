import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private apiUrl = 'http://localhost/hotelreservation/';
  constructor(private HttpClient: HttpClient) { }

  

  registrarAdmin(formData: FormData): Observable<any>{
    const headers = new HttpHeaders({
      // Aquí puedes agregar encabezados si los necesitas, por ejemplo, autorización
      // 'Authorization': 'Bearer <token>',
    });
    return this.HttpClient.post(this.apiUrl + 'usuario.php', formData, { headers });
  }
}
