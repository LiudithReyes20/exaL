import { Component, ViewChild, OnInit } from '@angular/core';
import { SidevarComponent } from '../sidevar/sidevar.component';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';

// Define una interfaz para tu formulario
interface FormularioUsuario {
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  estado: string;
  ciudad: string;
  colonia: string;
  codigoPostal: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  tipoUser: any | null = ''; 
  formData: FormularioUsuario = {
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    estado: '',
    ciudad: '',
    colonia: '',
    codigoPostal: '',
    email: '',
    password: ''
  };

  @ViewChild('f') formulario: NgForm | undefined; 

  constructor(private usuarioService: UsuarioServiceService, private login: LoginServiceService) {}

  ngOnInit() {
    this.tipoUser = this.getTipoUser();
    console.log("tipo user: ", this.tipoUser);
  }

  onSubmit(form: FormularioUsuario) {
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key as keyof FormularioUsuario]);
    });

    formData.append('tipo_usuario', this.tipoUser == 1 ? '1' : '2');

    this.usuarioService.registrarAdmin(formData).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);
        if (this.formulario) {
          this.formulario.resetForm();
        }
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }

  getTipoUser() {
    return this.login.getTipoUsuario();
  }
}