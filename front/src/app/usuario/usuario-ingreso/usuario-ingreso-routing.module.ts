import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioIngresoComponent } from './usuario-ingreso.component';

const routes: Routes = [
  {
    path:'',
    component: UsuarioIngresoComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoRoutingModule {}

