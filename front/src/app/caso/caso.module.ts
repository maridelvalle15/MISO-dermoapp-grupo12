
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasoListarComponent } from './caso-listar/caso-listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';


@NgModule({
  declarations: [CasoListarComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule
  ],
  exports: [CasoListarComponent]
})
export class CasoModule { }
