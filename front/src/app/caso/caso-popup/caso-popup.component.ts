import { Component,OnInit,Input  } from '@angular/core';
import { CasoService } from '../caso.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caso-popup',
  templateUrl: './caso-popup.component.html',
  styleUrls: ['./caso-popup.component.css']
})
export class CasoPopupComponent implements OnInit {

  @Input() casos!: CasoService;
  caso: any ;
  id: any;


  constructor(private casoService: CasoService, private dialog:MatDialog, private route: ActivatedRoute,private cookieService: CookieService,) {

  }


  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id')
      console.log(this.id)
      const cookie= this.cookieService.get('id');
      if (this.id=cookie) {
        this.getCasoPopUp();
      }

  }

  getCasoPopUp(){
    this.casoService.getCaso(this.id).subscribe(caso => {
      this.caso = caso;
      console.log(caso)

    })

  }
  onNoClick(): void {
    this.dialog.closeAll();
  }
  }



