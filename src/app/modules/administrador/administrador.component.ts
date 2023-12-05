// Importaciones necesarias
import { Component, inject, OnInit } from '@angular/core';
import { debounceTime, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../interfaces/cursos.interface';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  // Propiedades del componente
  productos$!: Observable<Cursos[]>;
  _productosService = inject(CursosService);
  _router = inject(Router);
  searcher = new FormControl('');

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener la lista de productos al iniciar el componente
    this.productos$ = this._productosService.obtenercurso();

    // Suscribirse a los cambios en el campo de búsqueda con un retardo de 1 segundo
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {
      // Filtrar la lista de productos según el término de búsqueda
      if (search) {
        console.log(search);
        this.productos$ = this._productosService.obtenercurso(search);
      } else {
        // Si no hay término de búsqueda, mostrar todos los productos
        this.productos$ = this._productosService.obtenercurso();
      }
    });
  }

  // Método para editar un producto
  editPlayer(productos: Cursos) {
    // Navegar a la página de edición de cursos y pasar los datos del producto
    this._router.navigateByUrl('/cursosedit', { state: { productos } });
    console.log(productos);
    console.log(this.productos$);
  }

  // Método para eliminar un producto
  deletePlayer(productos: Cursos) {
    // Confirmar la eliminación antes de proceder
    if (confirm(`Seguro de borrar a ${productos.nombre}`)) {
      // Verificar que el ID esté definido antes de intentar eliminar
      if (productos.id) {
        // Llamar al servicio para eliminar el producto
        this._productosService.deletePlayer(productos.id);
      }
    }
  }

}

