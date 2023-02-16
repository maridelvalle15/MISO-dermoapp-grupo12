
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasoListarComponent } from './caso-listar/caso-listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { MaterialModule } from 'app/material/material/material.module';
import { CasoPopupComponent } from './caso-popup/caso-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [CasoListarComponent, CasoPopupComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule,MaterialModule,BrowserAnimationsModule
  ],
  exports: [CasoListarComponent]
})
export class CasoModule { }
