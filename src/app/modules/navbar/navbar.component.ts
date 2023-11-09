import { AfterViewInit, Component, ElementRef, OnInit, inject } from '@angular/core';

import { UserService } from "../../services/user.service";

import { Router } from '@angular/router';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc, getDoc, DocumentReference } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    this.getDatosUser3
  }
  user: User | null = null; // Initialize with null
  login: boolean = false;
  rol: 'usuario' | 'admin' = 'usuario';

  constructor(private elementRef: ElementRef, private auth: Auth, private userService: UserService, private firestore: Firestore, private router: Router )  {
    this.userService.isLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        console.log('El usuario está logueado');
        // Realiza las acciones necesarias cuando el usuario está logueado
        this.login = true;
        // Obtener el UID del usuario logueado
        const user = this.auth.currentUser;
        if (user) {
          const uid = user.uid;
          this.getDatosUser3(uid); // Pasar el UID a la funciónk
        }
      } else {
        console.log('El usuario no está logueado');
        // Realiza las acciones necesarias cuando el usuario no está logueado
        this.login = false;
      }
    });
  }

  getDatosUser3(uid: string | undefined) {
    if (uid) {
      this.userService.getUserByUid(uid).subscribe(user => {
        if (user) {
          console.log('Usuario encontrado:', user);
          console.log('Rol usuario', user.rol);
  
          if (user.rol === 'usuario' || user.rol === 'admin') {
            this.rol = user.rol;
          } else {
            this.rol = 'usuario';
          }
        } else {
          console.log('Usuario no encontrado');
        }
      });
    }
  }
  
  cerrarSesion() {
    window.location.reload();
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/register']);
      })
      .catch(error => console.log(error)); 
  }
  
}
