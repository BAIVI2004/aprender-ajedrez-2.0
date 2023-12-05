// Importaciones necesarias
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _router = inject(Router);

  // Declaración de propiedad para el formulario de inicio de sesión
  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    // Inicialización del formulario en el constructor
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Puedes realizar tareas adicionales al iniciar el componente si es necesario
  }

  // Método para manejar el envío del formulario de inicio de sesión
  onSubmit() {
    // Verifica si el formulario es válido
    if (this.formLogin.invalid) {
      // Puedes realizar alguna acción si el formulario es inválido (opcional)
      return;
    }

    // Llama al servicio de usuario para realizar el inicio de sesión
    this.userService.login(this.formLogin.value)
      .then(response => {
        // Manejar la respuesta exitosa del servicio
        console.log(response);
        this._router.navigate(['/home']);
      })
      .catch(error => {
        // Manejar el error de inicio de sesión
        console.log(error);
        this._router.navigate(['/main']); // Esto debería estar dentro del bloque then para ejecutarse solo si la promesa es exitosa
      });
  }

  // Método para manejar el inicio de sesión con Google
  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        // Manejar la respuesta exitosa del inicio de sesión con Google
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch(error => {
        // Manejar el error del inicio de sesión con Google
        console.log(error);
      });
  }

  // Método para navegar a la página de registro de usuarios
  navigateToUserAdd() {
    this.router.navigate(['/main']);
  }

  // Método para cerrar sesión
  cerrarSesion() {
    window.location.reload(); // Recarga la página (puedes ajustar según la necesidad)
    
    // Llama al servicio de usuario para cerrar sesión
    this.userService.logout()
      .then(() => {
        // Manejar la promesa exitosa (puedes realizar acciones adicionales si es necesario)
        this.router.navigate(['/register']); // Redirige a la página de registro
        console.log("Sesión cerrada");
      })
      .catch(error => {
        // Manejar el error al cerrar sesión
        console.log(error);
      });
  }
}
