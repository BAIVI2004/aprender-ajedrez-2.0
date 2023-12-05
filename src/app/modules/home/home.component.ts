// Importaciones necesarias desde Angular core
import { Component, OnInit, inject } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../interfaces/cursos.interface';
import { debounceTime, Observable } from 'rxjs';
import { Router } from '@angular/router';

// Decorador Component que define las propiedades del componente
@Component({
  selector: 'app-home', // Selector que se utiliza para referenciar el componente en las plantillas
  templateUrl: './home.component.html', // Ruta del archivo HTML asociado al componente
  styleUrls: ['./home.component.css'] // Ruta del archivo de estilos asociado al componente
})
export class HomeComponent implements OnInit {
  _router = inject(Router);

  cursos$!: Observable<Cursos[]>;
  _cursosService = inject(CursosService);

  // Constructor del componente que no recibe parámetros
  constructor() { }

  // Método ngOnInit que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Inicialización de la variable cursos$ con los cursos obtenidos del servicio _cursosService
    this.cursos$ = this._cursosService.obtenercurso();
  }

  // Método inspeccionar que se ejecuta al hacer clic en un curso
  inspeccionar(cursos: Cursos): void {
    // Obtención del ID del curso seleccionado y navegación a la página correspondiente
    const productId = cursos.id;
    console.log(productId);
    this._router.navigate(['/seleccionado', productId]);
  }
}

