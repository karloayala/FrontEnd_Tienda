import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ProductoPreview {
  nombre: string;
  marca: string;
  precio: number;
  stock: number;
  categoria_id: number;
  categoriaNombre: string;
  valorTotalLote: number;
  estadoStock: 'Stock Crítico' | 'Stock Moderado' | 'Stock Óptimo';
}

@Component({
  selector: 'app-productos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  productoForm: FormGroup;
  mensajeExito: boolean = false;
  modalProductoAbierto: boolean = false;
  productoParaConfirmar: ProductoPreview | null = null;

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

  abrirModalProducto() {
    if (this.productoForm.valid) {
      const form = this.productoForm.value;
      const precioNum = Number(form.precio);
      const stockNum = Number(form.stock);
      const catId = Number(form.categoria_id);
      const categoriaEncontrada = this.categorias.find(c => c.id === catId);

      let estado: 'Stock Crítico' | 'Stock Moderado' | 'Stock Óptimo' = 'Stock Óptimo';
      if (stockNum <= 5) {
        estado = 'Stock Crítico';
      } else if (stockNum <= 15) {
        estado = 'Stock Moderado';
      }

      this.productoParaConfirmar = {
        nombre: form.nombre.trim(),
        marca: form.marca.trim(),
        precio: precioNum,
        stock: stockNum,
        categoria_id: catId,
        categoriaNombre: categoriaEncontrada ? categoriaEncontrada.nombre : 'General',
        valorTotalLote: precioNum * stockNum,
        estadoStock: estado
      };

      this.modalProductoAbierto = true;
    } else {
      this.productoForm.markAllAsTouched();
    }
  }

  cerrarModalProducto() {
    this.modalProductoAbierto = false;
  }

  confirmarRegistroProducto() {
    if (!this.productoParaConfirmar) return;

    const productoModelo = {
      nombre: this.productoParaConfirmar.nombre,
      marca: this.productoParaConfirmar.marca,
      precio: this.productoParaConfirmar.precio,
      stock: this.productoParaConfirmar.stock,
      categoria_id: this.productoParaConfirmar.categoria_id
    };

    console.log('=== NUEVO PRODUCTO REGISTRADO (MODELO ER) ===');
    console.log(productoModelo);

    this.modalProductoAbierto = false;
    this.productoParaConfirmar = null;
    this.mensajeExito = true;
    this.productoForm.reset({
      categoria_id: ''
    });

    setTimeout(() => {
      this.mensajeExito = false;
    }, 4000);
  }
}