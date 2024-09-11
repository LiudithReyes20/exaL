import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarHotelComponent } from 'src/app/modales/modal-agregar-hotel/modal-agregar-hotel.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { ModalInfoHabitacionesComponent } from 'src/app/modales/modal-info-habitaciones/modal-info-habitaciones.component';
import { ModalInfoServicesComponent } from 'src/app/modales/modal-info-services/modal-info-services.component';
import { ModalAgregarHabitacionComponent } from 'src/app/modales/modal-agregar-habitacion/modal-agregar-habitacion.component';

@Component({
  selector: 'app-lista-hoteles',
  templateUrl: './lista-hoteles.component.html',
  styleUrls: ['./lista-hoteles.component.css']
})
export class ListaHotelesComponent implements OnInit {
  hoteles: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'sitio', 'servicio', 'habitacion', 'agregarhabitacion'];
  infoCompleteHotel: InfoCompleteHotel = {} as InfoCompleteHotel;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Añade la referencia al paginador

  constructor(private hotelService: HotelServiceService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.hoteles);
  }

  ngOnInit(): void {
    this.obtenerHoteles();
    this.dataSource.sort = this.sort;
  }

  obtenerHoteles(): void {
    this.hotelService.getAllHoteles().subscribe(
      (data) => {
        console.log("All hoteles", data);
        this.hoteles = data;
        this.dataSource.data = this.hoteles;
        this.dataSource.paginator = this.paginator;  // Asigna el paginador aquí
      },
      (error) => {
        console.error('Error al obtener los hoteles:', error);
      }
    );
  }

  filtrarHoteles(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const nombreHotel = data.nombre_hotel.toLowerCase();
      const nombreLugar = data.nombre_lugar.toLowerCase();
      return nombreHotel.includes(filter) || nombreLugar.includes(filter);
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirModalAgregarHotel() {
    const lugaresParaModal = this.hoteles
      .map(hotel => ({
        id_lugar: hotel.id_lugar,
        nombre_lugar: hotel.nombre_lugar
      }))
      .filter((lugar, index, self) =>
        index === self.findIndex(l => l.id_lugar === lugar.id_lugar)
      );

    const dialogRef = this.dialog.open(ModalAgregarHotelComponent, {
      width: '700px',
      height: '500px',
      data: { lugares: lugaresParaModal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos del nuevo hotel:', result);
        this.obtenerHoteles();
      }
    });
  }

  /*onViewDetails(id: any){
    this.hotelService.getHotelDetails(id).subscribe(
      (response) => {
        if(response){
          this.infoCompleteHotel = response;
          console.log("datos de hotel: ", this.infoCompleteHotel);
        }
      }
    )
  }*/

    onViewDetails(id: any, tipo: string) { // Agregamos el parámetro 'tipo'
      this.hotelService.getHotelDetails(id).subscribe(
        (response) => {
          if (response) {
            this.infoCompleteHotel = response;
            console.log("datos de hotel: ", this.infoCompleteHotel);
  
            // Abrimos el modal correspondiente según el tipo
            if (tipo === 'servicios') {
              this.abrirModalServicios(this.infoCompleteHotel.servicios); 
            } else if (tipo === 'habitaciones') {
              this.abrirModalHabitaciones(this.infoCompleteHotel.habitaciones);
            }
          }
        }
      );
    }

    abrirModalServicios(servicios: any[]) {
      this.dialog.open(ModalInfoServicesComponent, {
        data: { servicios } 
      });
    }
  
    abrirModalHabitaciones(habitaciones: any[]) {
      this.dialog.open(ModalInfoHabitacionesComponent, {
        data: { habitaciones }
      });
    }

   /* addHabitacion(id:any){
      this.hotelService.crearHabitacion(data).subscribe(
        (response) => {
          console.log("respuesta: ",response);
        }
      )
    }*/

      openAddRoomModal(id: any): void {
        const dialogRef = this.dialog.open(ModalAgregarHabitacionComponent, {
          width: '400px', // Puedes ajustar el tamaño del modal
          data: { id_hotel: id } // Pasa el id del hotel al modal
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('El modal se cerró');
          // Puedes manejar la respuesta después de cerrar el modal si es necesario
        });
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

interface Servicio {
  id_servicio: string;
  nombre: string;
  descripcion: string;
}

interface InfoCompleteHotel {
  id_hotel: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  estrellas: string;
  imagen: string;
  id_lugar: string;
  nombre_lugar: string;
  habitaciones: Habitacion[];
  servicios: Servicio[];
}
