import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ClientePreview {
  nombre: string;
  documento: string;
  email: string;
  segmento: string;
  lineaCreditoAsignada: number;
}

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {
  clienteForm: FormGroup;
  mensajeExito: boolean = false;
  modalConfirmacionAbierto: boolean = false;
  clienteParaConfirmar: ClientePreview | null = null;

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      primerNombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      segundoNombre: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]*$')]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      documento: ['', [Validators.required, Validators.pattern('^[0-9]{8,11}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  abrirModalConfirmacion() {
    if (this.clienteForm.valid) {
      const form = this.clienteForm.value;
      const esEmpresa = form.documento.length === 11;

      this.clienteParaConfirmar = {
        nombre: [form.primerNombre, form.segundoNombre, form.apellidoPaterno, form.apellidoMaterno]
          .filter(parte => parte && parte.trim() !== '')
          .join(' '),
        documento: form.documento,
        email: form.email,
        segmento: esEmpresa ? 'Corporativo / RUC' : 'Persona Natural / DNI',
        lineaCreditoAsignada: esEmpresa ? 15000.00 : 2500.00
      };

      this.modalConfirmacionAbierto = true;
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }

  cerrarModal() {
    this.modalConfirmacionAbierto = false;
  }

  confirmarRegistroCliente() {
    if (!this.clienteParaConfirmar) return;

    const clienteModelo = {
      nombre: this.clienteParaConfirmar.nombre,
      documento: this.clienteParaConfirmar.documento,
      email: this.clienteParaConfirmar.email
    };

    console.log('=== NUEVO CLIENTE REGISTRADO (MODELO ER) ===');
    console.log(clienteModelo);

    this.modalConfirmacionAbierto = false;
    this.clienteParaConfirmar = null;
    this.mensajeExito = true;
    this.clienteForm.reset();

    setTimeout(() => {
      this.mensajeExito = false;
    }, 4000);
  }
}