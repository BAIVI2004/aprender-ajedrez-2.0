import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  _router = inject(Router);
  userForm: FormGroup;
  currentUser: User | null = null;
  userData: any = {};

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private formBuilder: FormBuilder,
    private router: Router

  ) {
    this.userForm = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      imagen: ['']
    });
  }

  ngOnInit() {
    this.auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        this.currentUser = user;
        const uid = user.uid;
        const userRef = doc(this.firestore, `usuarios/${uid}`);
        getDoc(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            this.userData = snapshot.data();
            this.userForm.patchValue(this.userData);
          }
        }).catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
      } else {
        this.currentUser = null;
        this.userData = {};
      }
    });
  }

  guardarDatos() {
    if (this.currentUser) {
      const uid = this.currentUser.uid;
      const userRef = doc(this.firestore, `usuarios/${uid}`);
      const formData = this.userForm.value;
      setDoc(userRef, formData, { merge: true })
        .then(() => {
          console.log('Datos actualizados correctamente');
          this.router.navigate(['/usuario']);
        })
        .catch((error) => {
          console.error('Error al actualizar los datos:', error);
        });
    }
  }

}
