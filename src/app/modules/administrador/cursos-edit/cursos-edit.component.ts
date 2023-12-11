// Importaciones para los cursos
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/cursos.service';
import { Cursos } from '../../../interfaces/cursos.interface';

@Component({
  selector: 'app-cursos-edit',
  templateUrl: './cursos-edit.component.html',
  styleUrls: ['./cursos-edit.component.css']
})
export class CursosEditComponent implements OnInit {

  // FormGroup para el formulario reactivo
  form: FormGroup;

  // Variable para almacenar la información del curso actual
  cursos: Cursos | null = null;

  // Constructor del componente
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {
    // Inicializa el formulario reactivo con controles para cada campo y validadores
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      duracion: ['', Validators.required],
      estrellas: ['', Validators.required],
      image: ['', Validators.required],
      image2: ['', Validators.required],
      image3: ['', Validators.required],
      video: ['', Validators.required],
      niveles: ['', Validators.required]
    });
  }

  // Método de inicialización que se ejecuta al cargar el componente
  ngOnInit(): void {
    // Obtiene los datos del curso actual desde el estado de la ruta
    this.cursos = history.state.productos;  // Corregir el nombre de la propiedad
    // Si existen datos del curso, actualiza el formulario con esa información
    if (this.cursos) {
      this.form.patchValue({
        nombre: this.cursos.nombre,
        descripcion: this.cursos.descripcion,
        tipo: this.cursos.tipo,
        duracion: this.cursos.duracion,
        image: this.cursos.image,
        image2: this.cursos.image2,
        image3: this.cursos.image3,
        video: this.cursos.video,
        estrellas: this.cursos.estrellas,
        niveles: this.cursos.niveles
      });
    }
  }

  // Método para actualizar la información del curso
  updateProducto(): void {
    // Verifica si el formulario es inválido o si no hay información del curso
    if (this.form.invalid || !this.cursos) {
      return;
    }

    // Crea un objeto con la información actualizada del curso
    const updatedProduct: Cursos = {
      id: this.cursos.id,
      ...this.form.value
    };

    // Llama al servicio para actualizar el curso
    this.cursosService.actualizarcurso(updatedProduct)
      .then(() => {
        console.log('Producto actualizado');
        // Navega a la página de administrador después de la actualización
        this.router.navigateByUrl('/administrador');
      })
      .catch((error) => {
        console.error('Error al actualizar el producto', error);
      });
  }
}
