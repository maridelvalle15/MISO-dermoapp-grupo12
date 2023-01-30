import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { RegistroExitosoComponent } from './registro-exitoso/registro-exitoso.component';

const routes: Routes = [
  {
    path:'registro',
    component: RegistroComponent,
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
