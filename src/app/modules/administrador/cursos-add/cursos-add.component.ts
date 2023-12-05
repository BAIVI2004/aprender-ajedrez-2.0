// Importaciones de módulos y servicios necesarios
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CursosService } from '../../../services/cursos.service';
import { Router } from '@angular/router';

// Decorador del componente
@Component({
  selector: 'app-cursos-add',
  templateUrl: './cursos-add.component.html',
  styleUrls: ['./cursos-add.component.css']
})
export class CursosAddComponent implements OnInit {
// Declaración de propiedades
  formulario: FormGroup; // Representa el formulario del componente
  _router = inject(Router); // Inyección del servicio Router usando la función inject


  // Constructor del componente
  constructor(private cursosServices: CursosService) {
    // Inicialización del formulario reactivo usando FormGroup y FormControl
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      descripcion: new FormControl(),
      tipo: new FormControl(),
      duracion: new FormControl(),
      estrellas: new FormControl(),
      image: new FormControl(),
      image2: new FormControl(),
      image3: new FormControl(),
      video: new FormControl(),
      niveles: new FormControl()
    });
  }
// Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
  }
// Método que se ejecuta al enviar el formulario
  async onSubmit() {
    // Crear un objeto con los valores del formulario y un ID basado en la marca de tiempo
    const nuevoProducto = {
      id: Date.now().toString(),
      ...this.formulario.value
    };
// Llamar al servicio para añadir un nuevo curso
    const response = await this.cursosServices.anadircurso(nuevoProducto);
    console.log(response);
    // Navegar a la ruta '/administracionproductos' después de añadir el curso
    this._router.navigate(['/administracionproductos']);

  }
}
