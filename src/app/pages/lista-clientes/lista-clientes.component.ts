import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtro: string = '';
  cargando: boolean = false;

  clienteForm: Cliente = {
    id: 0,
    nombre: '',
    email: '',
    categoria: 'premium',
    estado: 1
  };

  editando: boolean = false;
  idEditar: number | null = null;

  categorias = [
    { valor: 'premium', etiqueta: 'Premium' },
    { valor: 'personal', etiqueta: 'Personal' },
    { valor: 'empresarial', etiqueta: 'Empresarial' }
  ];

  constructor(
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar los clientes:', error);
        this.cargando = false;
      }
    });
  }

  filtrarClientes(): void {
    const termino = this.filtro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c =>
      (c.nombre + ' ' + c.email + ' ' + c.categoria).toLowerCase().includes(termino)
    );
  }

  abrirFormularioCrear(): void {
    this.editando = false;
    this.idEditar = null;
    this.clienteForm = {
      id: 0,
      nombre: '',
      email: '',
      categoria: 'premium',
      estado: 1
    };
  }

  abrirFormularioEditar(cliente: Cliente): void {
    this.editando = true;
    this.idEditar = cliente.id;
    this.clienteForm = { ...cliente };
  }

  guardarCliente(): void {
    if (this.editando && this.idEditar !== null) {
      const id = this.idEditar;
      this.clienteService.actualizarCliente(id, this.clienteForm).subscribe({
        next: () => {
          const index = this.clientes.findIndex(c => c.id === id);
          if (index !== -1) {
            this.clientes[index] = { ...this.clienteForm, id };
            this.clientesFiltrados = [...this.clientes];
          }
          this.cancelar();
        },
        error: (error) => console.error('Error al actualizar cliente:', error)
      });
    } else {
      this.clienteService.crearCliente(this.clienteForm).subscribe({
        next: (nuevo) => {
          this.clientes.push(nuevo);
          this.clientesFiltrados = [...this.clientes];
          this.cancelar();
        },
        error: (error) => console.error('Error al crear cliente:', error)
      });
    }
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.id !== id);
          this.clientesFiltrados = [...this.clientes];
        },
        error: (error) => console.error('Error al eliminar cliente:', error)
      });
    }
  }

  cancelar(): void {
    this.editando = false;
    this.idEditar = null;
    this.clienteForm = {
      id: 0,
      nombre: '',
      email: '',
      categoria: 'premium',
      estado: 1
    };
  }
}