import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroExitosoComponent } from './registro-exitoso.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RegistroExitosoComponent],
  exports:[RegistroExitosoComponent]
})
export class RegistroExitosoModule { }
