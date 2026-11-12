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
      nombres: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      tipoDocumento: ['DNI', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern('^[0-9]{8,11}$')]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      tipoCliente: ['Natural', Validators.required]
    });
  }

  registrarCliente() {
    if (this.clienteForm.valid) {
      // Impresión en consola requerida por la consigna
      console.log('=== NUEVO CLIENTE REGISTRADO ===');
      console.log(this.clienteForm.value);

      this.mensajeExito = true;
      this.clienteForm.reset({
        tipoDocumento: 'DNI',
        tipoCliente: 'Natural'
      });

      setTimeout(() => {
        this.mensajeExito = false;
      }, 4000);
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }
}