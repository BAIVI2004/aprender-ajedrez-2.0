import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CursosService } from '../../../services/cursos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-add',
  templateUrl: './cursos-add.component.html',
  styleUrls: ['./cursos-add.component.css']
})
export class CursosAddComponent implements OnInit {

  formulario: FormGroup;
  _router = inject(Router);

  constructor(private cursosServices: CursosService) {
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

  ngOnInit(): void {
  }

  async onSubmit() {
    
    const nuevoProducto = {
      id: Date.now().toString(),
      ...this.formulario.value
    };

    const response = await this.cursosServices.anadircurso(nuevoProducto);
    console.log(response);
    this._router.navigate(['/administracionproductos']);

  }
}
