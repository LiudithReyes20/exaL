import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { ServicesServiceService } from 'src/app/services/services-service.service';
import { LugarServiceService } from 'src/app/services/lugar-service.service';


@Component({
  selector: 'app-modal-agregar-hotel',
  templateUrl: './modal-agregar-hotel.component.html',
  styleUrls: ['./modal-agregar-hotel.component.css']
})
export class ModalAgregarHotelComponent implements OnInit {

  nuevoHotel: {
    nombre_hotel: string;
    estrellas: string;
    direccion: string;
    servicios: any[];  // Modificado para manejar múltiples servicios
    descripcion_hotel: string;
    id_lugar: number | null;
    imagen: File | null;
  } = {
    nombre_hotel: '',
    estrellas: '',
    direccion: '',
    descripcion_hotel: '',
    servicios: [],  // Inicializa como un array vacío
    id_lugar: null,
    imagen: null
  };

  lugares: any[] = [];
  //frutas: string[] = ['Manzana', 'Banana', 'Cereza', 'Durazno', 'Fresa'];  // Datos en duro
  servicios: any[] = [];

  imagenSeleccionada: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarHotelComponent>,
    private hotelService: HotelServiceService,
    private serviceService: ServicesServiceService,
    private lugarService: LugarServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { lugares: any[] }
  ) {
    this.lugares = data.lugares;
  }

  ngOnInit(): void {
    // Inicialización si es necesaria
    this.getServices();
    this.getLugares();
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      this.nuevoHotel.imagen = file;
      
      // Mostrar una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagenSeleccionada = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarHotel() {
    if (!this.nuevoHotel.imagen) {
      console.error('No se ha seleccionado ninguna imagen');
      return;
    }
  
    const formData = new FormData();
    formData.append('nuevoHotel', JSON.stringify({
      nombre: this.nuevoHotel.nombre_hotel,
      descripcion: this.nuevoHotel.descripcion_hotel,
      direccion: this.nuevoHotel.direccion,
      estrellas: parseInt(this.nuevoHotel.estrellas),
      id_lugar: this.nuevoHotel.id_lugar,
      servicios: this.nuevoHotel.servicios.map(s => s.id_servicio)  // Enviamos solo los IDs de los servicios
    }));
    formData.append('imagen', this.nuevoHotel.imagen, this.nuevoHotel.imagen.name);

  
    console.log('Datos del hotel:', {
      nombre: this.nuevoHotel.nombre_hotel,
      descripcion: this.nuevoHotel.descripcion_hotel,
      direccion: this.nuevoHotel.direccion,
      estrellas: parseInt(this.nuevoHotel.estrellas),
      id_lugar: this.nuevoHotel.id_lugar,
      servicios: this.nuevoHotel.servicios.map(s => s.id_servicio)
    });
    console.log('Imagen seleccionada:', this.nuevoHotel.imagen);
  
    this.hotelService.crearHotel(formData).subscribe(
      (response: any) => {
        console.log('Hotel creado con éxito', response);
        this.dialogRef.close(true);
      },
      (error: any) => {
        console.error('Error al crear el hotel', error);
        alert('Error al crear el hotel: ' + error);
      }
    );
  }

  getServices(){
    this.serviceService.getAllServices().subscribe(
      (response: any) => {
        this.servicios = response;
        console.log("all services: ", this.servicios);
      }
    )
  }

  getLugares(){
    this.lugarService.getHoteles().subscribe(
      (response: any) => {
        this.lugares = response;
        console.log("all lugares: ", this.lugares);
      }
    )
  }
}