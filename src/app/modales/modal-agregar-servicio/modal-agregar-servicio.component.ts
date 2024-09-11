import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { ServicesServiceService } from 'src/app/services/services-service.service';

@Component({
  selector: 'app-modal-agregar-servicio',
  templateUrl: './modal-agregar-servicio.component.html',
  styleUrls: ['./modal-agregar-servicio.component.css']
})
export class ModalAgregarServicioComponent implements OnInit{
    
  nuevoService: {
    nombre_service: string;
    descripcion_service: string;
  } = {
    nombre_service: '',
    descripcion_service: ''
  };

  services: any[] = [];
 

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarServicioComponent>,
    private hotelService: HotelServiceService,
    private serviceService: ServicesServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { lugares: any[] }
  ) {
    
  }

  ngOnInit(): void {
    
  }

  

  guardarService() {
    const nuevoServicio = {
      nombre: this.nuevoService.nombre_service,
      descripcion: this.nuevoService.descripcion_service
    };

    console.log('Datos del servicio:', nuevoServicio);
  
    this.serviceService.crearServicio(nuevoServicio).subscribe(
      (response: any) => {
        console.log('servicio creado con éxito', response);
        //this.dialogRef.close(true);
        this.dialogRef.close(response);
      },
      (error: any) => {
        console.error('Error al crear el servicio', error);
        alert('Error al crear el servicio: ' + error.message);
      }
    );
  }

}