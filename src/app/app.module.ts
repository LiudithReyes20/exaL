import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { HomeComponent } from './components/home/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; // Importa los módulos necesarios
import { FormsModule } from '@angular/forms';
import { ListaSitiosTuristicosComponent } from './components/admin/lista-sitios-turisticos/lista-sitios-turisticos.component';
import { RegistrarUsuarioComponent } from './components/admin/registrar-usuario/registrar-usuario.component';
import { SidevarComponent } from './components/admin/sidevar/sidevar.component';
import { ModalAgregarHotelComponent } from './modales/modal-agregar-hotel/modal-agregar-hotel.component';
import { ModalAgregarSitioComponent } from './modales/modal-agregar-sitio/modal-agregar-sitio.component';
import { ListaHotelesComponent } from './components/admin/lista-hoteles/lista-hoteles.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';  // Importa el módulo MatIconModule
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServiciosHotelComponent } from './components/admin/servicios-hotel/servicios-hotel.component';
import { ModalAgregarServicioComponent } from './modales/modal-agregar-servicio/modal-agregar-servicio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ModalInfoServicesComponent } from './modales/modal-info-services/modal-info-services.component';
import { ModalInfoHabitacionesComponent } from './modales/modal-info-habitaciones/modal-info-habitaciones.component';
import { ModalAgregarHabitacionComponent } from './modales/modal-agregar-habitacion/modal-agregar-habitacion.component';
import { MatMenuModule } from '@angular/material/menu';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListaHotelesComponent,
    ListaSitiosTuristicosComponent,
    RegistrarUsuarioComponent,
    SidevarComponent,
    ModalAgregarHotelComponent,
    ModalAgregarSitioComponent,
    ServiciosHotelComponent,
    ModalAgregarServicioComponent,
    ModalInfoServicesComponent,
    ModalInfoHabitacionesComponent,
    ModalAgregarHabitacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
