import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent {

  tipoUser: any;

  constructor(private loginService: LoginServiceService, private router: Router){}

  ngOnInit(){
    this.tipoUser = this.getTipoUser();
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/home']);
  }

  getTipoUser(){
    this.loginService.getTipoUsuario();
  }
}
