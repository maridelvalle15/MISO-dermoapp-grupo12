
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRegistroComponent } from './usuario-registro/usuario-registro.component';
import { UsuarioIngresoComponent } from './usuario-ingreso/usuario-ingreso.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuarioIngresoComponent, UsuarioRegistroComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [UsuarioIngresoComponent,UsuarioRegistroComponent]
})
export class UsuarioModule { }
