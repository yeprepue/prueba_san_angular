import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificacionService, Notificacion } from '../../services/notificacion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <div
        *ngFor="let notif of notificaciones"
        class="max-w-sm rounded-lg shadow-lg p-4 text-white transform transition-all duration-300 animate-slide-in"
        [class]="obtenerClase(notif.tipo)"
      >
        <div class="flex items-center">
          <span class="mr-3 text-xl">{{ obtenerIcono(notif.tipo) }}</span>
          <p class="text-sm font-medium">{{ notif.mensaje }}</p>
          <button
            (click)="cerrar(notif.id)"
            class="ml-auto text-white hover:text-gray-200 focus:outline-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  notificaciones: Notificacion[] = [];
  private suscripcion!: Subscription;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.suscripcion = this.notificacionService.notificaciones$.subscribe({
      next: (lista: Notificacion[]) => {
        this.notificaciones = [...lista];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  obtenerClase(tipo: string): string {
    switch (tipo) {
      case 'exito':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'advertencia':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  }

  obtenerIcono(tipo: string): string {
    switch (tipo) {
      case 'exito':
        return '✓';
      case 'error':
        return '✕';
      case 'advertencia':
        return '⚠';
      default:
        return 'ℹ';
    }
  }

  cerrar(id: number): void {
    this.notificaciones = this.notificaciones.filter(n => n.id !== id);
  }
}