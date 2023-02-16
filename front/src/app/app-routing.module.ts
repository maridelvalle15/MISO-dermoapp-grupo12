import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioIngresoComponent } from './usuario/usuario-ingreso/usuario-ingreso.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { RegistroExitosoComponent } from './usuario/usuario-registro/registro-exitoso/registro-exitoso.component';
import { CasoListarComponent } from './caso/caso-listar/caso-listar.component';
import { PermisoGuard } from './permiso.guard';
import { CasoPopupComponent } from './caso/caso-popup/caso-popup.component';


const routes: Routes = [
  {path:'',component: UsuarioIngresoComponent},
  {path:'usuario-registro',component: UsuarioRegistroComponent},
  {path:'usuario-registro/registro-exitoso',component: RegistroExitosoComponent},
  {path:'caso-listar',component: CasoListarComponent,canActivate: [PermisoGuard]},
  {path:'caso-listar/:id',component: CasoPopupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
