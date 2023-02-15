import { Component } from '@angular/core';
import { CasoService } from '../caso.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-caso-popup',
  templateUrl: './caso-popup.component.html',
  styleUrls: ['./caso-popup.component.css']
})
export class CasoPopupComponent {
  casos: any;
  constructor(private casoService: CasoService, private dialog:MatDialog) {}

  ngOnInit() {
    this.getCasoPopUp();

  }

  getCasoPopUp(){
    this.casoService.getCasos().subscribe(casos => {
      this.casos = casos;
      this.casos = Object.values(this.casos.casos)
    })

  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

}
