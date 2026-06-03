import { Component } from '@angular/core';
import { cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';



@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent {

  clientes: cliente[] = [];
  clientesFiltrados: cliente[] = [];
  filtro: string = '';

  constructor(
    private clienteService: ClienteService
  ){}

  ngOnInit(): void {
    this.cargarClientes();
  }
  cargarClientes(): void {
    this.clienteService.getclientes().subscribe({
      next: (clientes: cliente[]) => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
      },
      error: (error: any) => {
        console.error('Error al cargar los clientes:', error);
      }
    });
  }
}
