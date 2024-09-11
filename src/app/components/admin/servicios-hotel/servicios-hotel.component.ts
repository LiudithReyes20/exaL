import { Component, OnInit, ViewChild } from '@angular/core';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarHotelComponent } from 'src/app/modales/modal-agregar-hotel/modal-agregar-hotel.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ModalAgregarSitioComponent } from 'src/app/modales/modal-agregar-sitio/modal-agregar-sitio.component';
import { ModalAgregarServicioComponent } from 'src/app/modales/modal-agregar-servicio/modal-agregar-servicio.component';
import { ServicesServiceService } from 'src/app/services/services-service.service';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-servicios-hotel',
  templateUrl: './servicios-hotel.component.html',
  styleUrls: ['./servicios-hotel.component.css']
})
export class ServiciosHotelComponent {

  displayedColumns: string[] = ['sitio', 'detalles'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Añade la referencia al paginador

   // Definir los datos en duro aquí
   sitiosTuristicos: any[] = [
   /* { nombre: 'canchas', descripcion: 'Al aire libre' },
    { nombre: 'alberca', descripcion: 'Agua templada' },
    { nombre: 'lobby', descripcion: 'Excelente para descansos y drinks' }*/
  ];

  constructor(private hotelService: HotelServiceService, public dialog: MatDialog, private serviceService: ServicesServiceService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllServices();
  }


  
  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalAgregarServicioComponent, {
      width: '700px', 
      height: '500px',
      data: { nombre: '', lugar: '' } // Si necesitas pasar datos al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      console.log(result); // Aquí puedes manejar lo que se devuelve del modal
      if (result) {
        // Agregar el nuevo servicio directamente a la lista existente
        //this.sitiosTuristicos.push(result);
        //this.dataSource.data = this.sitiosTuristicos;  
        this.getAllServices();
      }
    });
  }

  getAllServices(){
    this.serviceService.getAllServices().subscribe(
      (data) => {
        this.sitiosTuristicos = data; // Asignar los datos recibidos a la variable "services"
        console.log("servicios all",this.sitiosTuristicos); // Opcional: Imprimir los datos en la consola
        this.dataSource.data = this.sitiosTuristicos;
        this.dataSource.paginator = this.paginator;  // Asigna el paginador aquí
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

  filtrarServices(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const nombreService = data.nombre.toLowerCase();
      //const nombreLugar = data.nombre_lugar.toLowerCase();
      return nombreService.includes(filter);
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}//