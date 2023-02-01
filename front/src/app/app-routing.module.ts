import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioIngresoComponent } from './usuario/usuario-ingreso/usuario-ingreso.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { RegistroExitosoComponent } from './usuario/usuario-registro/registro-exitoso/registro-exitoso.component';


const routes: Routes = [
  {path:'',component: UsuarioIngresoComponent},
  {path:'usuario-registro',component: UsuarioRegistroComponent},
  {path:'usuario-registro/registro-exitoso',component: RegistroExitosoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
