import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/usuario/usuario.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.component.html',
  styleUrls: ['./registro-exitoso.component.css']
})
export class RegistroExitosoComponent implements OnInit {
  usuarioForm !: FormGroup;
  constructor(
    private usuarioService: UsuarioService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,

  ) { }
  email :any;
  password: any;
  ngOnInit() {
    this.router.queryParams.subscribe((params:any)=>{
      this.email = params.data
      this.password = params.passwordUsuario


    })



  }

}
