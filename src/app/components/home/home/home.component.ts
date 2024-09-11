import { Component, OnInit } from '@angular/core';
import { LugarServiceService } from 'src/app/services/lugar-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router';
import { HotelServiceService } from 'src/app/services/hotel-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allHotels: HotelLugar[] = [];
  hoteles: any[] = [];
  selectedHotel: any = null;
  tipoUsuario: number | null = null;
  precioMinimo: number = 100; // Valor en duro
  precioMaximo: number = 500; // Valor en duro
  habitaciones = 1;
  personas = 1;
  personasYHabitaciones = `${this.personas} Personas, ${this.habitaciones} Habitaciones`;
  hotel = {
    imageUrl: 'assets/images/hotel.jpg', // Cambia esto con la URL de tu imagen
    name: 'Hotel Paradise',
    location: 'Cancún, México',
    description: 'Un lugar maravilloso para disfrutar de unas vacaciones inolvidables.',
    stars: 4,
    price: 150
  };
  get starsArray() {
    return new Array(this.hotel.stars);
  }




  constructor(private lugarService: LugarServiceService, private loginService: LoginServiceService, private hotelService: HotelServiceService) { }

  ngOnInit(): void {
    this.obtenerHoteles();
    this.getAllHoteles();
    this.tipoUsuario = this.loginService.getTipoUsuario(); 
  }
  
  reserve() {
    // Lógica para reservar el hotel
    console.log('Hotel reservado:', this.hotel.name);
  }
  obtenerHoteles(): void {
    this.lugarService.getHoteles().subscribe(
      (data) => {
        console.log("lugares", data); 
        this.hoteles = data;
      },
      (error) => {
        console.error('Error al obtener los hoteles:', error);
      }
    );
  }

  getAllHoteles(){
    this.hotelService.getAllHoteles().subscribe(
      (response) => {
        if(response){
          this.allHotels = response;
          console.log("respuesta todos hoteles: ",this.allHotels);
          this.allHotels.forEach(hotel => {
            console.log(hotel.estrellas); // O realizar alguna operación
            this.hotel.stars = hotel.estrellas;
          });
        }
      }
    )
  }

  onHotelSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast al elemento HTMLInputElement
    const nombre = inputElement.value;
  
    if (nombre) {
      this.selectedHotel = this.hoteles.find(hotel => hotel.nombre === nombre);
      console.log('Hotel seleccionado:', this.selectedHotel);
    }
  }
  
  restarHabitaciones() {
    if (this.habitaciones > 1) {
      this.habitaciones--;
      this.actualizarPersonasYHabitaciones();
    }
  }

  agregarHabitaciones() {
    this.habitaciones++;
    this.actualizarPersonasYHabitaciones();
  }

  restarPersonas() {
    if (this.personas > 1) {
      this.personas--;
      this.actualizarPersonasYHabitaciones();
    }
  }

  agregarPersonas() {
    this.personas++;
    this.actualizarPersonasYHabitaciones();
  }

  actualizarPersonasYHabitaciones() {
    this.personasYHabitaciones = `${this.personas} Personas, ${this.habitaciones} Habitaciones`;
  }

}

export interface HotelLugar {
  descripcion: string;
  descripcion_hotel: string;
  direccion: string;
  estrellas: number ; // Si las estrellas se manejan como números, podrías cambiarlo a `number`
  id_hotel: string;  // Si `id_hotel` es un número, cambia el tipo a `number`
  id_lugar: string;  // Igual que con `id_hotel`, cámbialo a `number` si es numérico
  imagen: string;
  nombre_hotel: string;
  nombre_lugar: string;
}