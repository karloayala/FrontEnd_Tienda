import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  productoForm: FormGroup;
  mensajeExito: boolean = false;

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      sku: ['', [Validators.required, Validators.pattern('^[A-Z]{3}-[0-9]{4}$')]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      categoria: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1), Validators.max(50000)]],
      stock: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      garantiaMeses: ['12', Validators.required],
      condicion: ['Nuevo', Validators.required]
    });
  }

  registrarProducto() {
    if (this.productoForm.valid) {
      // Impresión en consola requerida por la consigna
      console.log('=== NUEVO PRODUCTO INGRESADO ===');
      console.log(this.productoForm.value);

      this.mensajeExito = true;
      this.productoForm.reset({
        garantiaMeses: '12',
        condicion: 'Nuevo'
      });

      setTimeout(() => {
        this.mensajeExito = false;
      }, 4000);
    } else {
      this.productoForm.markAllAsTouched();
    }
  }
}