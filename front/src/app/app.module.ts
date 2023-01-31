import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioIngresoModule } from './usuario/usuario-ingreso/usuario-ingreso.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuarioIngresoModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
