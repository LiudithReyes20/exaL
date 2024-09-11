import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info-services',
  templateUrl: './modal-info-services.component.html',
  styleUrls: ['./modal-info-services.component.css']
})
export class ModalInfoServicesComponent {
  servicios: Servicio[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { servicios: Servicio[] }) {
    this.servicios = data.servicios;
  }
}

interface Servicio {
  id_servicio: string;
  nombre: string;
  descripcion: string;
}
