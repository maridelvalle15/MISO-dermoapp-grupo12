import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-usuario-ingreso',
  templateUrl: './usuario-ingreso.component.html',
  styleUrls: ['./usuario-ingreso.component.css']
})
export class UsuarioIngresoComponent implements OnInit {

  helper = new JwtHelperService();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cookieService: CookieService

  ) { }

  error: boolean = false

  ngOnInit() {
  }

  onLogInUsuario(correo: string, password: string){
    this.error = false

    this.usuarioService.userLogIn(correo, password)
    .subscribe((res: any) => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.router.navigate([`../header/`])
      this.cookieService.set('token_access',res.token,1,'/')
    },
    error => {
      this.error=true
    })
  }

}
