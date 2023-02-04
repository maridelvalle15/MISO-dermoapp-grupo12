import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.component.html',
  styleUrls: ['./registro-exitoso.component.css']
})
export class RegistroExitosoComponent implements OnInit {
  usuarioForm !: FormGroup;
  constructor(
    private router: ActivatedRoute,
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
