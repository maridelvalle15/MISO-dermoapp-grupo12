import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {  FormGroup } from '@angular/forms';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-usuario-ingreso',
  templateUrl: './usuario-ingreso.component.html',
  styleUrls: ['./usuario-ingreso.component.css']
})
export class UsuarioIngresoComponent implements OnInit {

  helper = new JwtHelperService();
  usuarioForm !: FormGroup;


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    public translate: TranslateService

  ) {

    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');

  }

  error: boolean = false

  ngOnInit() {

    this.usuarioForm = this.formBuilder.group({

      correo: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]

    })
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }



  onLogInUsuario(correo: string, password: string){


    this.usuarioService.userLogIn(correo, password)
    .subscribe((res: any) => {

      this.router.navigate([`../caso-listar`],{queryParams:{data:this.usuarioForm.get('correo')?.value,}})
      this.cookieService.set('token_access',res.token,1,'/')
      this.cookieService.set('correo',this.usuarioForm.get('correo')?.value)
    },
    error => {
      this.error=true
    })
  }

}
