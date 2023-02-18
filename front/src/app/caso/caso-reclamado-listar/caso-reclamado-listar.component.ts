import { Component, OnInit } from '@angular/core';
import { CasoService } from '../caso.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caso-reclamado-listar',
  templateUrl: './caso-reclamado-listar.component.html',
  styleUrls: ['./caso-reclamado-listar.component.css']
})
export class CasoReclamadoListarComponent implements OnInit {
  token: any;
  casos: any;
  constructor(private casoService: CasoService,private cookieService: CookieService) { }

  ngOnInit() {
    this.getCasoReclamado();
  }

  getCasoReclamado() {
    this.casoService.getCasoReclamado().subscribe(casos => {
      this.casos = casos;
      console.log(casos)
      this.casos = Object.values(this.casos.casos)
    })

  }
}
