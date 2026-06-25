import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Notificacion {
  id: number;
  mensaje: string;
  tipo: 'exito' | 'error' | 'advertencia' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificaciones: Notificacion[] = [];
  private notificacionesSubject = new Subject<Notificacion[]>();
  notificaciones$: Observable<Notificacion[]> = this.notificacionesSubject.asObservable();
  private contadorId = 0;

  mostrar(mensaje: string, tipo: 'exito' | 'error' | 'advertencia' | 'info' = 'info'): void {
    const notificacion: Notificacion = {
      id: this.contadorId++,
      mensaje,
      tipo
    };
    this.notificaciones = [...this.notificaciones, notificacion];
    this.notificacionesSubject.next([...this.notificaciones]);
    setTimeout(() => {
      this.eliminar(notificacion.id);
    }, 4000);
  }

  exito(mensaje: string): void {
    this.mostrar(mensaje, 'exito');
  }

  error(mensaje: string): void {
    this.mostrar(mensaje, 'error');
  }

  advertencia(mensaje: string): void {
    this.mostrar(mensaje, 'advertencia');
  }

  eliminar(id: number): void {
    this.notificaciones = this.notificaciones.filter(n => n.id !== id);
    this.notificacionesSubject.next([...this.notificaciones]);
  }
}