import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../interfaces/cursos.interface';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

 
  productos$!: Observable<Cursos[]>;
  _productosService = inject(CursosService);
  _router = inject(Router);
  searcher = new FormControl('');

  ngOnInit(): void {
    this.productos$ = this._productosService.obtenercurso();
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {
      // this._playerService.
      if (search) {
        console.log(search);
        this.productos$ = this._productosService.obtenercurso(search);
      } else {
        this.productos$ = this._productosService.obtenercurso();
      }
    });
  }

  editPlayer(productos: Cursos) {
    this._router.navigateByUrl('/cursosedit', { state: { productos } });
    console.log(productos)
    console.log(this.productos$)
  }

  deletePlayer(productos: Cursos) {
    if (confirm(`Seguro de borrar a ${productos.nombre}`)) {
      if (productos.id) { // Verificar que el ID esté definido
        this._productosService.deletePlayer(productos.id);
      }
    }
  }

}
