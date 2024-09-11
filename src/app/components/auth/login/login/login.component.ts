import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router'; // Importar Router para la redirección

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = ''; // Variable para almacenar el correo electrónico
  password: string = ''

  @ViewChild('f') formulario: NgForm | undefined;

  constructor(private loginService: LoginServiceService, private router: Router) {} // Inyectar Router

  onSubmit() {
    if (this.formulario && this.formulario.valid) {
      const email = this.formulario.value.email;
      const password = this.formulario.value.password;

      this.loginService.login(email, password).subscribe(
        (response) => {
          if (response.success) {
            console.log('Inicio de sesión exitoso:', response);
              if(response.tipo_usuario == 1){
                this.router.navigate(['/lista-hoteles']);
              } else {
                this.router.navigate(['/home']);
              }
          } else {
            console.error('Error al iniciar sesión:', response.message);
            // Mostrar el mensaje de error al usuario
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          // Manejar otros errores de red o del servidor
        }
      );
    }
  }
}