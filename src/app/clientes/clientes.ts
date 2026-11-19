import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {
  clienteForm: FormGroup;
  mensajeExito: boolean = false;

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

  registrarCliente() {
    if (this.clienteForm.valid) {
      const form = this.clienteForm.value;

      // Objeto adaptado exactamente a la entidad CLIENTE (nombre, documento, email)
      const clienteModelo = {
        nombre: [form.primerNombre, form.segundoNombre, form.apellidoPaterno, form.apellidoMaterno]
          .filter(parte => parte && parte.trim() !== '')
          .join(' '),
        documento: form.documento,
        email: form.email
      };

      console.log('=== NUEVO CLIENTE REGISTRADO (MODELO ER) ===');
      console.log(clienteModelo);

      this.mensajeExito = true;
      this.clienteForm.reset();

      setTimeout(() => {
        this.mensajeExito = false;
      }, 4000);
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }
}