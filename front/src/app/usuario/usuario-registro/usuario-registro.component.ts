import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {
  postId: any;

  usuarioForm !: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({

      correo: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      direccion: ["", [Validators.required, Validators.maxLength(50)]],
      pais: ["", [Validators.required, Validators.maxLength(50)]],
      ciudad: ["", [Validators.required, Validators.maxLength(50)]],
      especialidad: ["", [Validators.required, Validators.maxLength(50)]],
      licencia: ["", [Validators.required, Validators.maxLength(50)]],
    })
  }

  registrarUsuario(){
    this.usuarioService.userSignUp('MEDICO', this.usuarioForm.get('correo')?.value, this.usuarioForm.get('nombre')?.value, this.usuarioForm.get('direccion')?.value, this.usuarioForm.get('pais')?.value, this.usuarioForm.get('ciudad')?.value,this.usuarioForm.get('especialidad')?.value,this.usuarioForm.get('licencia')?.value)
    .subscribe(res => {
      this.router.navigate([`/usuario-registro/registro-exitoso`],{queryParams:{data:this.usuarioForm.get('correo')?.value,passwordUsuario: res.password}})
    },)
  }
}
