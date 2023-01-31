import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioIngresoComponent } from './usuario-ingreso.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsuarioIngresoComponent],
  exports:[UsuarioIngresoComponent]
})
export class UsuarioIngresoModule { }



