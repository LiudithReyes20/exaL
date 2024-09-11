import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ModalAgregarSitioComponent } from 'src/app/modales/modal-agregar-sitio/modal-agregar-sitio.component';
import { LugarServiceService } from 'src/app/services/lugar-service.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-sitios-turisticos',
  templateUrl: './lista-sitios-turisticos.component.html',
  styleUrls: ['./lista-sitios-turisticos.component.css']
})
export class ListaSitiosTuristicosComponent implements OnInit {
  displayedColumns: string[] = ['sitio', 'detalles'];
  dataSource: MatTableDataSource<any>;
  lugares: any[] = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  // Definir los datos en duro aquí
  sitiosTuristicos: any[] = [
    { nombre: 'Parque Nacional', descripcion: 'Gran parque con zonas de senderismo' },
    { nombre: 'Museo de Historia', descripcion: 'Museo dedicado a la historia local' },
    { nombre: 'Playa Dorada', descripcion: 'Famosa playa con arena dorada y aguas cristalinas' }
  ];

  constructor(public dialog: MatDialog, private lugarService: LugarServiceService) {
    this.dataSource = new MatTableDataSource(this.sitiosTuristicos);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.obtenerHoteles();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalAgregarSitioComponent, {
      width: '700px',
      height: '500px',
      data: { nombre: '', lugar: '' } // Si necesitas pasar datos al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      console.log(result); // Aquí puedes manejar lo que se devuelve del modal
      this.obtenerHoteles();
    });
  }

  obtenerHoteles(): void {
    this.lugarService.getHoteles().subscribe(
      (data) => {
        console.log("lugares", data);
        this.lugares = data;
        this.dataSource.data = this.lugares;
        this.dataSource.paginator = this.paginator;  // Asigna el paginador aquí
      },
      (error) => {
        console.error('Error al obtener los hoteles:', error);
      }
    );
  }

  // Método para filtrar los sitios turísticos
  filtrarSitios(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Define la lógica del filtro personalizado
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const nombreSitio = data.nombre.toLowerCase();
      const descripcionSitio = data.descripcion.toLowerCase();
      return nombreSitio.includes(filter) || descripcionSitio.includes(filter);
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
