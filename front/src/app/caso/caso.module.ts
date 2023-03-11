
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasoListarComponent } from './caso-listar/caso-listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { MaterialModule } from 'app/material/material/material.module';
import { CasoPopupComponent } from './caso-popup/caso-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CasoReclamadoListarComponent } from './caso-reclamado-listar/caso-reclamado-listar.component';
import { CasoDiagnosticoPopupComponent } from './caso-diagnostico-popup/caso-diagnostico-popup.component';
import { CasoReclamadoDetallePopupComponent } from './caso-reclamado-detalle-popup/caso-reclamado-detalle-popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { CasoPacienteDetallePopupComponent } from './caso-paciente-detalle-popup/caso-paciente-detalle-popup.component';



@NgModule({
  declarations: [CasoListarComponent, CasoPopupComponent,CasoReclamadoListarComponent,CasoDiagnosticoPopupComponent,CasoReclamadoDetallePopupComponent,CasoPacienteDetallePopupComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule,MaterialModule,BrowserAnimationsModule,TranslateModule
  ],
  exports: [CasoListarComponent]
})
export class CasoModule { }
