import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; // No necesitas BehaviorSubject en este caso

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost/hotelreservation/';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.httpClient.post(this.apiUrl + 'login.php', body.toString(), { headers }).pipe(
      tap((response: any) => {
        if (response.success) {
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('tipo_usuario', response.tipo_usuario); 
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('tipo_usuario');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_id'); // Verificar si el usuario está autenticado
  }

  getTipoUsuario(): number | null {
    const tipoUsuario = localStorage.getItem('tipo_usuario');
    return tipoUsuario ? +tipoUsuario : null; // Convertir a número si es necesario
  }
}