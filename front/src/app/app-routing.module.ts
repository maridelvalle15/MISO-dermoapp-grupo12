import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioIngresoComponent } from './usuario/usuario-ingreso/usuario-ingreso.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { RegistroExitosoComponent } from './usuario/usuario-registro/registro-exitoso/registro-exitoso.component';
import { HeaderComponent } from './app-header/header/header/header.component';
import { PermisoGuard } from './permiso.guard';


const routes: Routes = [
  {path:'',component: UsuarioIngresoComponent},
  {path:'usuario-registro',component: UsuarioRegistroComponent},
  {path:'usuario-registro/registro-exitoso',component: RegistroExitosoComponent,canActivate: [PermisoGuard]},
  {path:'header',component: HeaderComponent,canActivate: [PermisoGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
