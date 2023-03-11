import { Component, OnInit } from '@angular/core';
import { CasoService } from '../caso.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caso-paciente-detalle-popup',
  templateUrl: './caso-paciente-detalle-popup.component.html',
  styleUrls: ['./caso-paciente-detalle-popup.component.css']
})
export class CasoPacienteDetallePopupComponent implements OnInit {
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
      this.getPacientePopUp();
    }
  }

  getPacientePopUp() {
    this.casoService.getPaciente(this.id).subscribe((caso) => {
      this.caso = caso;
    });
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }



}
