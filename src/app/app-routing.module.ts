import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { UsuarioComponent } from './modules/usuario/usuario.component';
import { ContrasenaComponent } from './modules/usuario/contrasena/contrasena.component';
import { DatosComponent } from './modules/usuario/datos/datos.component';
import { AdministradorComponent } from './modules/administrador/administrador.component';
import { CursosAddComponent } from './modules/administrador/cursos-add/cursos-add.component';
import { CursosEditComponent } from './modules/administrador/cursos-edit/cursos-edit.component';
import { AutenticacionComponent } from './modules/autenticacion/autenticacion.component';
import { LoginComponent } from './modules/autenticacion/login/login.component';
import { RegisterComponent } from './modules/autenticacion/register/register.component';
import { PanelComponent } from './modules/administrador/panel/panel.component';
import { CursoseleccionadoComponent } from './modules/home/cursoseleccionado/cursoseleccionado.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'contrasena', component: ContrasenaComponent },
  { path: 'datos', component: DatosComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'paneladministrador', component: PanelComponent },
  { path: 'cursosadd', component: CursosAddComponent },
  { path: 'cursosedit', component: CursosEditComponent },
  { path: 'autenticacion', component: AutenticacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cursos', component: RegisterComponent },

  { path: 'seleccionado/:id', component: CursoseleccionadoComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
