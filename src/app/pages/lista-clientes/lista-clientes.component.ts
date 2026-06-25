import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

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
  mostrarModal: boolean = false;

  categorias = [
    { valor: 'premium', etiqueta: 'Premium' },
    { valor: 'personal', etiqueta: 'Personal' },
    { valor: 'empresarial', etiqueta: 'Empresarial' }
  ];

  constructor(
    private clienteService: ClienteService,
    private notificacionService: NotificacionService
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
        this.notificacionService.error('Error al cargar los clientes');
      }
    });
  }

  filtrarClientes(): void {
    const termino = this.filtro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c =>
      (c.nombre + ' ' + c.email + ' ' + c.categoria).toLowerCase().includes(termino)
    );
  }

  abrirModalCrear(): void {
    this.editando = false;
    this.clienteForm = {
      id: 0,
      nombre: '',
      email: '',
      categoria: 'premium',
      estado: 1
    };
    this.mostrarModal = true;
  }

  abrirModalEditar(cliente: Cliente): void {
    this.editando = true;
    this.clienteForm = { ...cliente };
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarCliente(): void {
    if (this.editando) {
      const id = this.clienteForm.id;
      this.clienteService.actualizarCliente(id, this.clienteForm).subscribe({
        next: () => {
          const index = this.clientes.findIndex(c => c.id === id);
          if (index !== -1) {
            this.clientes[index] = { ...this.clienteForm, id };
            this.clientesFiltrados = [...this.clientes];
          }
          this.cerrarModal();
          this.notificacionService.exito('Cliente actualizado correctamente');
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
          this.notificacionService.error('Error al actualizar cliente');
        }
      });
    } else {
      this.clienteService.crearCliente(this.clienteForm).subscribe({
        next: (nuevo) => {
          this.clientes.push(nuevo);
          this.clientesFiltrados = [...this.clientes];
          this.cerrarModal();
          this.notificacionService.exito('Cliente creado correctamente');
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
          this.notificacionService.error('Error al crear cliente');
        }
      });
    }
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.id !== id);
          this.clientesFiltrados = [...this.clientes];
          this.notificacionService.exito('Cliente eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
          this.notificacionService.error('Error al eliminar cliente');
        }
      });
    }
  }
}