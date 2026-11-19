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

  // Datos ficticios de la tabla CATEGORIA (id, nombre)
  categorias = [
    { id: 1, nombre: 'Laptops y Computadoras' },
    { id: 2, nombre: 'Periféricos y Accesorios' },
    { id: 3, nombre: 'Monitores y Pantallas' },
    { id: 4, nombre: 'Componentes PC' },
    { id: 5, nombre: 'Smartphones y Tablets' }
  ];

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      precio: ['', [Validators.required, Validators.min(0.1), Validators.max(50000)]],
      stock: ['', [Validators.required, Validators.min(1), Validators.max(1000), Validators.pattern('^[0-9]+$')]],
      categoria_id: ['', Validators.required]
    });
  }

  registrarProducto() {
    if (this.productoForm.valid) {
      const form = this.productoForm.value;

      // Objeto adaptado exactamente a la entidad PRODUCTO (nombre, marca, precio, stock, categoria_id)
      const productoModelo = {
        nombre: form.nombre.trim(),
        marca: form.marca.trim(),
        precio: Number(form.precio),
        stock: Number(form.stock),
        categoria_id: Number(form.categoria_id)
      };

      console.log('=== NUEVO PRODUCTO REGISTRADO (MODELO ER) ===');
      console.log(productoModelo);

      this.mensajeExito = true;
      this.productoForm.reset({
        categoria_id: ''
      });

      setTimeout(() => {
        this.mensajeExito = false;
      }, 4000);
    } else {
      this.productoForm.markAllAsTouched();
    }
  }
}