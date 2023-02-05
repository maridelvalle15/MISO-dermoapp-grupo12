import { Component, OnInit } from '@angular/core';
import { Caso } from '../caso';
import { CasoService } from '../caso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-caso-listar',
  templateUrl: './caso-listar.component.html',
  styleUrls: ['./caso-listar.component.css']
})
export class CasoListarComponent implements OnInit {
  token: any;

  constructor(
    private casoService: CasoService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }



  ngOnInit() {
    this.getCasos();

  }

  getCasos():void{
    this.casoService.getCasos().subscribe(res => {
      console.log(res)
    })
  }

}
