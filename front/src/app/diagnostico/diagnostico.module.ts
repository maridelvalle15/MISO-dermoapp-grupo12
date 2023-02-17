
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from '../app-header/app-header.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DiagnosticoListarComponent } from './diagnostico-listar/diagnostico-listar.component';

@NgModule({
  declarations: [DiagnosticoListarComponent],
  imports: [
    CommonModule, ReactiveFormsModule,AppHeaderModule
  ],
  exports: [DiagnosticoListarComponent]
})
export class DiagnosticoModule { }
