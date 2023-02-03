import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-ingreso',
  templateUrl: './usuario-ingreso.component.html',
  styleUrls: ['./usuario-ingreso.component.css']
})
export class UsuarioIngresoComponent implements OnInit {

  helper = new JwtHelperService();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  error: boolean = false

  ngOnInit() {
  }

  onLogInUsuario(correo: string, password: string){
    this.error = false

    this.usuarioService.userLogIn(correo, password)
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.router.navigate([`../usuario-registro/`])
    },
    error => {
      this.error=true
    })
  }

}
