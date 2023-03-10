import { Component, OnInit } from '@angular/core';
import { CasoService } from '../caso.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caso-reclamado-detalle-popup',
  templateUrl: './caso-reclamado-detalle-popup.component.html',
  styleUrls: ['./caso-reclamado-detalle-popup.component.css']
})
export class CasoReclamadoDetallePopupComponent implements OnInit {
  caso: any;
  id: any;

  constructor(
    private casoService: CasoService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

   ngOnInit() {
    const cookie = this.cookieService.get('id');
    if ((this.id = cookie)) {
      this.getCasoPopUp();
    }
  }

  getCasoPopUp() {
    this.casoService.getCaso(this.id).subscribe((caso) => {
      this.caso = caso;
    });
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }

}
