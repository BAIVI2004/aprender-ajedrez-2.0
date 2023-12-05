// Importaciones necesarias
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Declaración de propiedad para el formulario de registro
  formReg: FormGroup;

  constructor(private userService: UserService) {
    // Inicialización del formulario en el constructor
    this.formReg = new FormGroup({
      nombre: new FormControl(),
      rol: new FormControl('usuario'),
      apellido: new FormControl(),
      sexo: new FormControl(),
      edad: new FormControl(),
      correo: new FormControl(),
      imagen: new FormControl(),
      contraseña: new FormControl(),
      contraseña2: new FormControl()
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Puedes realizar tareas adicionales al iniciar el componente si es necesario
  }

  // Método para manejar el envío del formulario de registro
  onSubmit(): void {
    // Llama al servicio de usuario para realizar el registro
    this.userService.register(this.formReg.value)
      .then(response => {
        // Manejar la respuesta exitosa del servicio
        console.log(response);
        console.log("Éxito al crear usuario");
        
        // Obtén el ID único del usuario registrado
        const uid = response.user.uid;

        // Llama al servicio de usuario para guardar datos adicionales en Firestore
        this.userService.guardarDatos(uid, this.formReg.value)
          .then(() => {
            // Manejar la promesa exitosa al guardar datos en Firestore
            console.log("Datos guardados en Firestore");
          })
          .catch(error => {
            // Manejar el error al guardar datos en Firestore
            console.log("Error al guardar los datos en Firestore:", error);
          });
      })
      .catch(error => {
        // Manejar el error del registro
        console.log(error);
      });
  }
}
