import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioModule } from './usuario/usuario.module';
import { ToastrModule } from 'ngx-toastr';
import { AppHeaderModule } from './app-header/app-header.module';
import { CasoModule } from './caso/caso.module';
import { MaterialModule } from './material/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';



@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    UsuarioModule,
    AppHeaderModule,
    CasoModule,
    MaterialModule,
    BrowserAnimationsModule,
    DiagnosticoModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
