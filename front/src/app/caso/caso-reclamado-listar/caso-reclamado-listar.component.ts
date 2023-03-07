import { Component, OnInit } from '@angular/core';
import { CasoService } from '../caso.service';
import { CasoDiagnosticoPopupComponent } from '../caso-diagnostico-popup/caso-diagnostico-popup.component';
import { MatDialog ,MatDialogRef} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caso-reclamado-listar',
  templateUrl: './caso-reclamado-listar.component.html',
  styleUrls: ['./caso-reclamado-listar.component.css']
})
export class CasoReclamadoListarComponent implements OnInit {
  token: any;
  casos: any;
  id: any;
  constructor(private casoService: CasoService,public dialog:MatDialog,private cookieService: CookieService) { }

  ngOnInit() {
    this.getCasoReclamado();
  }

  getCasoReclamado() {
    this.casoService.getCasoReclamado().subscribe(casos => {
      this.casos = casos;
      this.casos = Object.values(this.casos.casos)


    })

  }
  openDialogDiagnostico(id:any) {

    this.dialog.open(CasoDiagnosticoPopupComponent, {
      width: '600px',
      height: '700px',
      data: id
    })



    this.cookieService.set('id',id)

  }

  postLiberarCaso(id:any) {
    this.casoService.liberarCaso((this.id = id)).subscribe((res: any) => {
      alert('Caso '+ id +' liberado');
      window.location.reload();
    });
  }



}
