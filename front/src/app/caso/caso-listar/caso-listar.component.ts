import { Component, OnInit } from '@angular/core';
import { CasoService } from '../caso.service';
import { MatDialog ,MatDialogRef} from '@angular/material/dialog';
import { CasoPopupComponent } from '../caso-popup/caso-popup.component';


@Component({
  selector: 'app-caso-listar',
  templateUrl: './caso-listar.component.html',
  styleUrls: ['./caso-listar.component.css']
})
export class CasoListarComponent implements OnInit {

  casos: any;
  constructor(private casoService: CasoService, public dialog:MatDialog) {}


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
  openDialog() {

    this.dialog.open(CasoPopupComponent, {
      width: '600px',
      height: '700px',
    })
  }

}
