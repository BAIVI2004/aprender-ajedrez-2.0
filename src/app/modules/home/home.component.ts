import { Component, OnInit, inject } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../interfaces/cursos.interface';
import { debounceTime, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  _router = inject(Router);

  cursos$!: Observable<Cursos[]>;
  _cursosService = inject(CursosService);
  constructor() { }

  ngOnInit(): void {
    this.cursos$ = this._cursosService.obtenercurso();
  }


  inspeccionar(cursos : Cursos){
    const productId = cursos.id;
    console.log(productId)
    console.log("mmmmm")
    this._router.navigate(['/seleccionado', productId]);
  }
}
