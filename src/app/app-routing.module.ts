import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { ListaHotelesComponent } from './components/admin/lista-hoteles/lista-hoteles.component';
import { ListaSitiosTuristicosComponent } from './components/admin/lista-sitios-turisticos/lista-sitios-turisticos.component';
import { ServiciosHotelComponent } from './components/admin/servicios-hotel/servicios-hotel.component';
import { RegistrarUsuarioComponent } from './components/admin/registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'lista-hoteles', component: ListaHotelesComponent},
  { path: 'listaHoteles', component: ListaHotelesComponent },
  { path: 'listaTuristicos', component: ListaSitiosTuristicosComponent },
  { path: 'listaServicios', component: ServiciosHotelComponent },
  { path: 'registrar', component: RegistrarUsuarioComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
