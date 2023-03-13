import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioIngresoComponent } from './usuario/usuario-ingreso/usuario-ingreso.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { RegistroExitosoComponent } from './usuario/usuario-registro/registro-exitoso/registro-exitoso.component';
import { CasoListarComponent } from './caso/caso-listar/caso-listar.component';
import { PermisoGuard } from './permiso.guard';
import { CasoPopupComponent } from './caso/caso-popup/caso-popup.component';
import { CasoReclamadoListarComponent } from './caso/caso-reclamado-listar/caso-reclamado-listar.component';
import { CasoAgendaListarComponent } from './caso/caso-agenda-listar/caso-agenda-listar.component';

const routes: Routes = [
  {path:'',component: UsuarioIngresoComponent},
  {path:'usuario-registro',component: UsuarioRegistroComponent},
  {path:'usuario-registro/registro-exitoso',component: RegistroExitosoComponent},
  {path:'caso-listar',component: CasoListarComponent,canActivate: [PermisoGuard]},
  {path:'caso-listar/:id',component: CasoPopupComponent,canActivate: [PermisoGuard]},
  {path:'diagnostico/caso-reclamado',component: CasoReclamadoListarComponent,canActivate: [PermisoGuard]},
  {path:'agenda',component: CasoAgendaListarComponent,canActivate: [PermisoGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
