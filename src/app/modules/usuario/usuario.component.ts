// Importaciones necesarias desde Angular core
import { Component, OnInit } from '@angular/core';

// Decorador Component que define las propiedades del componente
@Component({
  selector: 'app-usuario', // Selector que se utiliza para referenciar el componente en las plantillas
  templateUrl: './usuario.component.html', // Ruta del archivo HTML asociado al componente
  styleUrls: ['./usuario.component.css'] // Ruta del archivo de estilos asociado al componente
})
export class UsuarioComponent implements OnInit {

  // Constructor del componente
  constructor() { }

  // Método del ciclo de vida del componente que se ejecuta después de que Angular ha inicializado el componente
  ngOnInit(): void {
    // Lógica que se ejecuta cuando el componente ha sido inicializado
  }
}
