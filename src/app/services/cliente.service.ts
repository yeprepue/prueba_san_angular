import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: cliente[] = [
    {
      id: 1,
      nombre: 'Andres Lopez',
      image: 'assets/images/andres-lopez.jpg'
    },
    {
      id: 2,
      nombre: 'juan Perez',
      image: 'assets/images/juan-perez.jpg'
    },
    {
      id: 3,
      nombre: 'Andrea Lopez',
      image: 'assets/images/andrea-lopez.jpg'
    },
    {
      id: 4,
      nombre: 'Maria Lopez',
      image: 'assets/images/maria-lopez.jpg'
    },
    {
      id: 5,
      nombre: 'Carlos Rodriguez',
      image: 'assets/images/carlos-rodriguez.jpg'
    }
  ];
  getclientes(): Observable<cliente[]> {
    return of(this.clientes);
  }
}

