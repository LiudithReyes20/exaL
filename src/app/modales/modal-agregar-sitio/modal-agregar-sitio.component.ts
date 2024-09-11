import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { LugarServiceService } from 'src/app/services/lugar-service.service';
@Component({
  selector: 'app-modal-agregar-sitio',
  templateUrl: './modal-agregar-sitio.component.html',
  styleUrls: ['./modal-agregar-sitio.component.css']
})
export class ModalAgregarSitioComponent implements OnInit {

  
  nuevoLugar: {
    nombre_lugar: string;
    descripcion_lugar: string;
  } = {
    nombre_lugar: '',
    descripcion_lugar: ''
  };

  services: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarSitioComponent>,
    private hotelService: HotelServiceService,
    private lugarService: LugarServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { lugares: any[] }
  ) {
  }

  ngOnInit(): void {
    // Inicialización si es necesaria
  }


  guardarLugar() {
    const nuevoLugar = {
      nombre: this.nuevoLugar.nombre_lugar,
      descripcion: this.nuevoLugar.descripcion_lugar
    };

    console.log('Datos del lugar:', nuevoLugar);
  
    this.lugarService.agregarLugar(nuevoLugar).subscribe(
      (response: any) => {
        console.log('Lugar creado con éxito', response);
        //this.dialogRef.close(true);
        this.dialogRef.close(response);
      },
      (error: any) => {
        console.error('Error al crear el lugar', error);
        alert('Error al crear el lugar: ' + error.message);
      }
    );
  }

}