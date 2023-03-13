
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRegistroComponent } from './usuario-registro/usuario-registro.component';
import { UsuarioIngresoComponent } from './usuario-ingreso/usuario-ingreso.component';
import { RegistroExitosoComponent } from './usuario-registro/registro-exitoso/registro-exitoso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [UsuarioIngresoComponent, UsuarioRegistroComponent,RegistroExitosoComponent],
  imports: [
    CommonModule, ReactiveFormsModule,TranslateModule
  ],
  exports: [UsuarioIngresoComponent,UsuarioRegistroComponent,RegistroExitosoComponent]
})
export class UsuarioModule { }
