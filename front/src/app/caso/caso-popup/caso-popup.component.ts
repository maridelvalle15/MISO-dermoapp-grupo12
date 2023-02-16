import { Component } from '@angular/core';
import { CasoService } from '../caso.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-caso-popup',
  templateUrl: './caso-popup.component.html',
  styleUrls: ['./caso-popup.component.css']
})
export class CasoPopupComponent {
  caso: any ;

  constructor(private casoService: CasoService, private dialog:MatDialog, private route: ActivatedRoute) {}

    ngOnInit() {
      this.getCasoPopUp()

  }

  getCasoPopUp(){
    this.casoService.getCaso().subscribe(caso => {
      this.caso = caso;
      console.log(caso)

    })

  }
  onNoClick(): void {
    this.dialog.closeAll();
  }
  }




