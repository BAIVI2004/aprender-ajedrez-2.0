import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/cursos.service'
import { Cursos } from '../../../interfaces/cursos.interface';

@Component({
  selector: 'app-cursos-edit',
  templateUrl: './cursos-edit.component.html',
  styleUrls: ['./cursos-edit.component.css']
})
export class CursosEditComponent implements OnInit {

  form: FormGroup;
  cursos: Cursos | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {
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

  ngOnInit(): void {
    this.cursos = history.state.productos; // Corregir el nombre de la propiedad
    if (this.cursos) {
      this.form.patchValue({
        nombre: this.cursos.nombre,
        descripcion: this.cursos.descripcion,
        tipo: this.cursos.tipo,
        duracion: this.cursos.duracion,
        image: this.cursos.image,
        image2: this.cursos.image2,
        image3: this.cursos.image3,
        video:this.cursos.video,
        estrellas: this.cursos.estrellas,
        niveles: this.cursos.niveles
      });
    }
  }
  

  updateProducto(): void {
    if (this.form.invalid || !this.cursos) {
      return;
      console.log("ERROR")
    }
  
    const updatedProduct: Cursos = {
      id: this.cursos.id,
      ...this.form.value
    };

    this.cursosService.actualizarcurso(updatedProduct)
      .then(() => {
        console.log('Producto actualizado');
        this.router.navigateByUrl('/administrador');
      })
      .catch((error) => {
        console.error('Error al actualizar el producto', error);
      });
  }

}
