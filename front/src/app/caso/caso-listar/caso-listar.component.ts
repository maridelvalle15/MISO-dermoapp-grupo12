import { Component, OnInit } from '@angular/core';
import { CasoService } from '../caso.service';
import { MatDialog ,MatDialogRef} from '@angular/material/dialog';
import { CasoPopupComponent } from '../caso-popup/caso-popup.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caso-listar',
  templateUrl: './caso-listar.component.html',
  styleUrls: ['./caso-listar.component.css']
})
export class CasoListarComponent implements OnInit {
  caso: any ;
  casos: any;
  constructor(private casoService: CasoService, public dialog:MatDialog,private cookieService: CookieService,) {}


  ngOnInit() {
    this.getCasos();

  }

  getCasos(){
    this.casoService.getCasos().subscribe(casos => {
      this.casos = casos;
      console.log(casos)
      this.casos = Object.values(this.casos.casos)
    })

  }
  openDialog(id:any) {

    this.dialog.open(CasoPopupComponent, {
      width: '600px',
      height: '700px',
      data: id
    })

    console.log(id)
    this.cookieService.set('id',id)
  }

}
