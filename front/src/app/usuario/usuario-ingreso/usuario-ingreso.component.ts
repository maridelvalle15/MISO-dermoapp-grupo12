import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {  FormGroup } from '@angular/forms';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';




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

  ) { }

  error: boolean = false

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({

      correo: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],

    })
  }

  onLogInUsuario(correo: string, password: string){
    this.error = false

    this.usuarioService.userLogIn(correo, password)
    .subscribe((res: any) => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.router.navigate([`../caso/`],{queryParams:{data:this.usuarioForm.get('correo')?.value,}})
      this.cookieService.set('token_access',res.token,1,'/')
    },
    error => {
      this.error=true
    })
  }

}
