import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioModule } from './usuario/usuario.module';
import { ToastrModule } from 'ngx-toastr';
import { CasoComponent } from './caso/caso.component';
import { AppHeaderModule } from './app-header/app-header.module';


@NgModule({
  declarations: [
    AppComponent,
      CasoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    UsuarioModule,
    AppHeaderModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
