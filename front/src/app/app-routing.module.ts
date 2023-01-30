import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroExitosoComponent } from './registro/registro-exitoso/registro-exitoso.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'registro',component: RegistroComponent},
  {path:'registro/registro-exitoso', component:RegistroExitosoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
