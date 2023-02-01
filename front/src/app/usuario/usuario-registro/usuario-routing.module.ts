import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioRegistroComponent } from './usuario-registro.component';
import { RegistroExitosoComponent } from './registro-exitoso/registro-exitoso.component';
import { UsuarioIngresoComponent } from '../usuario-ingreso/usuario-ingreso.component';

const routes: Routes = [
  {
    path:'usuario-registro',
    component: UsuarioRegistroComponent,
    children:[
      {
        path: 'registro-exitoso',
        component: RegistroExitosoComponent
      }
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroRoutingModule {}
