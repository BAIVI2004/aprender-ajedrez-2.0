// Importación del decorador Component y OnInit desde Angular core
import { Component, OnInit } from '@angular/core';

// Decorador Component que define las propiedades del componente
@Component({
  selector: 'app-autenticacion', // Selector que se utiliza para referenciar el componente en las plantillas
  templateUrl: './autenticacion.component.html', // Ruta del archivo HTML asociado al componente
  styleUrls: ['./autenticacion.component.css'] // Ruta del archivo de estilos asociado al componente
})
export class AutenticacionComponent implements OnInit {

  // Constructor del componente
  constructor() { }

  // Método ngOnInit que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Puedes realizar tareas adicionales al iniciar el componente si es necesario
  }
}

