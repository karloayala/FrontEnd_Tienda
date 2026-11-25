import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService, ClienteRequest, ClienteResponse } from '../services/cliente.service';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {
  clienteForm: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  documentoBusqueda: string = '';
  clientesLista: ClienteResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      documento: ['', [Validators.required, Validators.pattern('^[0-9]{8,11}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  registrarCliente() {
    if (this.clienteForm.valid) {
      this.cargando = true;
      this.mensajeExito = '';
      this.mensajeError = '';

      const clienteRequest: ClienteRequest = {
        nombre: this.clienteForm.value.nombre.trim(),
        documento: this.clienteForm.value.documento.trim(),
        email: this.clienteForm.value.email.trim()
      };

      this.clienteService.registrarCliente(clienteRequest).subscribe({
        next: (respuesta: ClienteResponse) => {
          console.log('=== RESPUESTA DE BASE DE DATOS (POST) ===', respuesta);
          this.mensajeExito = `Cliente guardado en la base de datos con ID #${respuesta.id}.`;
          this.agregarATablaSinDuplicar(respuesta);
          this.clienteForm.reset();
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al registrar cliente:', err);
          this.mensajeError = err.error?.mensaje || err.error?.message || 'Error al registrar: verifica si el documento ya existe en la base de datos.';
          this.cargando = false;
        }
      });
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }

  buscarCliente() {
    const doc = this.documentoBusqueda.trim();
    if (!doc) return;

    this.mensajeExito = '';
    this.mensajeError = '';

    this.clienteService.buscarPorDocumento(doc).subscribe({
      next: (respuesta: ClienteResponse) => {
        console.log('=== CLIENTE ENCONTRADO EN BASE DE DATOS (GET) ===', respuesta);
        this.mensajeExito = `Cliente encontrado: ${respuesta.nombre} (ID #${respuesta.id}).`;
        this.agregarATablaSinDuplicar(respuesta);
        this.documentoBusqueda = '';
      },
      error: (err) => {
        console.error('Error al buscar cliente:', err);
        this.mensajeError = err.error?.mensaje || err.error?.message || `No se encontró ningún cliente con el documento ${doc}.`;
      }
    });
  }

  private agregarATablaSinDuplicar(cliente: ClienteResponse) {
    const existe = this.clientesLista.some(c => c.id === cliente.id);
    if (!existe) {
      this.clientesLista.unshift(cliente);
    }
  }
}