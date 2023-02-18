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
  caso: any;
  constructor(private casoService: CasoService,private cookieService: CookieService) { }

  ngOnInit() {
    //const cookie = this.cookieService.get('token_access');
    //if ((this.token = cookie)) {
      //this.getCasoReclamado();
    //}
  }

  getCasoReclamado() {
    this.casoService.getCasoReclamado(this.token).subscribe((caso) => {
      this.caso = caso;
    });

  }

}
