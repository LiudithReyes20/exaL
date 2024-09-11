import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-agregar-habitacion',
  templateUrl: './modal-agregar-habitacion.component.html',
  styleUrls: ['./modal-agregar-habitacion.component.css']
})
export class ModalAgregarHabitacionComponent {
  hotelId: number;

  constructor(
    private hotelService: HotelServiceService,
    public dialogRef: MatDialogRef<ModalAgregarHabitacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id_hotel: number }
  ) {
    this.hotelId = data.id_hotel;
  }

  onSubmit(form: NgForm) {
    const formData = {
      id_hotel: this.hotelId.toString(),
      tipo: form.value.tipo,
      precio_por_noche: form.value.precio_por_noche,
      numero_habitacion: form.value.numero_habitacion,
      capacidad: form.value.capacidad
    };

    this.hotelService.crearHabitacion(formData).subscribe(
      (response) => {
        console.log('Respuesta: ', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}