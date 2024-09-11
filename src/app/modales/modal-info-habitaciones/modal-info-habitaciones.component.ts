import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info-habitaciones',
  templateUrl: './modal-info-habitaciones.component.html',
  styleUrls: ['./modal-info-habitaciones.component.css']
})
export class ModalInfoHabitacionesComponent {
  habitaciones: Habitacion[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { habitaciones: Habitacion[] }) {
    this.habitaciones = data.habitaciones;
  }
}

interface Habitacion {
  id_habitacion: string;
  numero_habitacion: string;
  tipo: string;
  capacidad: string;
  precio_por_noche: string;
  id_hotel: string;
}
